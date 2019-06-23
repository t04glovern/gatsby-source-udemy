const axios = require(`axios`)

const fetch = (course) => {
  const url = `https://www.udemy.com/api-2.0/courses/${course}`
  return axios.get(url)
}

async function getAllUrls(courses) {
  try {
    var data = await Promise.all(
      courses.map(
        course =>
        fetch(course).then(
          (response) => response.data
        )));
    return (data)
  } catch (error) {
    console.log(error)
    throw (error)
  }
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}, {
  courses
}) => {
  const {
    createNode
  } = actions

  try {

    const course_json = await getAllUrls(courses)

    let importableResources = []
    importableResources = importableResources.concat(course_json)

    const resources = Array.prototype
      .concat(...importableResources)
      .map(resource => {
        return {
          ...resource,
          udemy_id: resource.id,
          id: createNodeId(resource.id),
        }
      })

    const getID = node => (node ? node.id : null)

    resources.map(resource => {
      const contentDigest = createContentDigest(resource)

      const links = {
        course___NODE: getID(resource.id)
      }

      const node = Object.assign(
        resource, {
          parent: null,
          children: [],
          internal: {
            type: `UdemyCourse`,
            contentDigest,
          },
        },
        links
      )

      createNode(node)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}