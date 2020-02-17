const AdminBro = require('admin-bro')
const { sort, timestamps } = require('./sort')

const uploads = require('./uploads')

// TODO add image
module.exports = {
  name: 'Cloth Items',
  sort,
  properties: {
    timestamps,
    _id: { isVisible: false },
    // published: {
    //   label: 'Published (custom render)',
    //   components: {
    //     list: AdminBro.bundle('../components/cloth-in-list'),
    //   },
    // },
  },
}
