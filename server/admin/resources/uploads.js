const AdminBro = require('admin-bro')
const { flatten, unflatten } = require('flat')

const fs = require('fs')
const path = require('path')
const util = require('util')

const fieldPath = 'uploadPhoto'
const uploadPath = path.join('public', 'uploads')

const createTmpDir = async () => {
  try {
    await util.promisify(fs.mkdir)(
      path.join(AdminBro.ADMIN_BRO_TMP_DIR, 'tmp'),
      { recursive: true }
    )
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error
    }
  }
}
createTmpDir()

/**
 * fileDataField: dbField
 */
const mappedFields = {
  name: 'filename',
  type: 'mimeType',
  size: 'size',
  path: 'path',
}

const mapFields = fileObject => {
  return Object.entries(mappedFields).reduce(
    (m, [fileDataField, dbField]) => ({
      ...m,
      [dbField]: fileObject[fileDataField],
    }),
    {}
  )
}

const recordToFileObject = record => {
  return Object.entries(mappedFields).reduce(
    (m, [fileDataField, dbField]) => ({
      ...m,
      [fileDataField]: record.param(dbField),
    }),
    {}
  )
}

/**
 * In Before filter it moves uploaded photo to the context
 */
const extractFileObject = request => {
  if (request.method === 'post' && request.payload) {
    const payload = unflatten(request.payload)
    const fileObject = payload[fieldPath]
    delete payload[fieldPath]

    return [
      {
        ...request,
        payload: flatten(payload),
      },
      fileObject,
    ]
  }
  return [request, null]
}

const generateTmpFilePath = fileObject => {
  return path.join(
    AdminBro.ADMIN_BRO_TMP_DIR,
    'tmp',
    `${new Date().getTime()}${fileObject.name}`
  )
}

const uploadToTmpFolder = fileObject => {
  const tmpFilePath = generateTmpFilePath(fileObject)
  fs.writeFileSync(tmpFilePath, fileObject.file)

  return { ...fileObject, tmpFilePath }
}

const createFileDir = async filePath => {
  try {
    await util.promisify(fs.mkdir)(path.dirname(filePath), { recursive: true })
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error
    }
  }
}

const removeTmpFile = fileObject => {
  fs.unlinkSync(fileObject.tmpFilePath)
}

const removeOldFile = (record, oldFileObject) => {
  const filePath = buildFilePath(record, oldFileObject)
  fs.unlinkSync(filePath)
}

const before = (request, context) => {
  if (request.method === 'post' && request.payload) {
    let [updatedRequest, fileObject] = extractFileObject(request)
    context[fieldPath] = fileObject && uploadToTmpFolder(fileObject)
    return updatedRequest
  }
  return request
}

const afterDelete = async (response, request, context) => {
  const { record } = context
  const fileObject = recordToFileObject(record)
  if (fileObject && fileObject.path) {
    removeOldFile(record, fileObject)
    // const filePath = buildFilePath(record, fileObject) // was commented
    // fs.unlinkSync(path.dirname(filePath)) // was commented
  }
  return response
}

const buildFilePath = (record, fileObject) => {
  return path.join(uploadPath, record.id().toString(), fileObject.name)
}

const after = async (response, request, context) => {
  const { record } = context
  const fileObject = context[fieldPath]

  if (request.method === 'post' && fileObject) {
    fileObject.path = buildFilePath(record, fileObject)

    await createFileDir(fileObject.path)

    const oldFileObject = recordToFileObject(record)

    await record.update(mapFields(fileObject))

    if (record.isValid()) {
      fs.renameSync(fileObject.tmpFilePath, fileObject.path)
      oldFileObject &&
        oldFileObject.path &&
        removeOldFile(record, oldFileObject)
      return {
        redirectUrl: context.h.recordActionUrl({
          resourceId: context.resource.id(),
          recordId: record.id(),
          actionName: 'show',
        }),
        record: record.toJSON(context.currentAdmin),
      }
    } else {
      removeTmpFile(fileObject)
      return { record: record.toJSON(context.currentAdmin) }
    }
  }
  return response
}

module.exports = {
  name: 'Uploads',
  properties: {
    uploadPhoto: {
      label: 'Upload image',
      isVisible: { show: false, edit: true, list: false, filter: false },
      custom: {
        mappedFields,
        mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
        maxSize: 10000 * 1024,
      },
      components: {
        edit: AdminBro.bundle('../components/upload-board'),
      },
    },
  },
  actions: {
    edit: {
      before: before,
      after: after,
    },
    new: {
      before: before,
      after: after,
    },
    delete: {
      after: afterDelete,
    },
  },
}
