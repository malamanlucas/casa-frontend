
const sortUtils = {
  sortByEnums: (array, enumsOptions, enumPropertyName) => {
    let map = new Map()

    enumsOptions.forEach(o => map.set(o, []))

    for (var i = 0; i < array.length; i++) {
      const enumsArray = map.get(array[i][enumPropertyName])

      if (enumsArray !== undefined) {
        enumsArray.push(array.splice(i, 1)[0])
      }
    }
    let newArray = []
    let iterator = map.values()
    let next = iterator.next()

    while (!next.done) {
      newArray = newArray.concat(next.value)
      next = iterator.next()
    }

    return newArray.concat(array)
  }
}

export default sortUtils
