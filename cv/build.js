const fs = require('fs'),
      path = require('path'),
      { exec } = require('child_process'),
      info = require('../src/config.json'),
      cv = path.resolve(__dirname, 'cv_source'),
      tempMD = path.resolve(__dirname, 'cv.md'),
      dest = path.resolve(__dirname, '../public'),
      destFile = path.resolve(__dirname, 'cv.pdf')
      finalDest = path.resolve(__dirname, '../public/cv.pdf')


exec(`rm ${finalDest}`, () => fs.readFile(`${cv}.md`, (error, data) => {
    if (error) throw error

    const parsedKeyWords = '`' + info.experienceInKeywords.join(' - ') + '`'
    const parsedData = data.toString()
                           .replace('{{description}}', info.description.join(' '))
                           .replace('{{profileImage}}', info.profileImage)
                           .replace('{{experienceInKeywords}}', parsedKeyWords)

    fs.writeFile(tempMD, parsedData, error => {
        if (error) throw error

        exec(`mdpdf ${tempMD} --style ${cv}.css --ignore-gh`, (error) => {
            if (error) throw error
            exec(`mv ${destFile} ${dest}`, () => exec(`rm ${tempMD}`, () => console.log('All done!')))
        })
    })
}))
