const AdminBro = require('admin-bro')
const AdminBroMongoose = require('admin-bro-mongoose')
AdminBro.registerAdapter(AdminBroMongoose)

const menu = {
  main: { name: 'Mongoose Resources', icon: 'icon-mongodb' },
}

// Custom Admin resources
const cloth = require('./resources/cloth')
const uploads = require('./resources/uploads')
// helpres
const { sort, timestamps } = require('./resources/sort')

// MongoDB Models
const Cloth = require('../models/cloth.model')
const Uploads = require('../models/uploads.model')

module.exports = {
  resources: [
    { resource: Cloth, options: { parent: menu.main, ...cloth } },
    { resource: Uploads, options: { parent: menu.main, ...uploads } },
  ],
  version: {
    admin: true,
  },
  branding: {
    companyName: 'DRESS CUTUR',
    logo: false,
    softwareBrothers: false,
  },
  dashboard: {
    handler: async () => {
      const cloths = await Cloth.find({}).limit(5)
      return {
        clothCount: await Cloth.countDocuments(),
        cloth: await Promise.all(
          cloths.map(async c => {
            return {
              title: c.title,
              _id: c._id,
            }
          })
        ),
      }
    },
    component: AdminBro.require('./components/dashboard-page'),
  },
}
