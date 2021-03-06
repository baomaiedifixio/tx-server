//import * as csv from 'csv';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import * as firstline from 'firstline';
// var csv = require('fast-csv');

export async function uploadFile(req, res) {
    if (!req['file']) {
        console.log("No file received");
        return res.send({
            success: false
        });
    } else {
        console.log('file received');
        return res.send({
            success: true,
            firstRow: await readFirstLine(req['file'].path)
        })
    }
}

export function readFirstLine(fileURL): Promise<any> {
    return new Promise<any>(resolve => {
        let firstRow = [];
        firstline(fileURL).then(data => {
            firstRow = data.split(";");
            resolve(firstRow);
        });

        // let parser = csv.parse({ delimiter: ';' }, (err, data) => {
        //     data.every((row, rowNumber) => {
        //         if (rowNumber == 0) {
        //             row.forEach(col => {
        //                 firstRow.push(col);
        //             })
        //             console.log(firstRow);
        //             resolve(firstRow)
        //         }
        //     });
        // });
        // fs.createReadStream(fileURL).pipe(parser);(e)

        // fs.createReadStream(fileURL)
        //     .pipe(csv.parse({ delimiter: ';' }))
        //     .on('data', function (csvrow) {
        //         firstRow.push(csvrow[0]);
        //         resolve(firstRow);
        //     })

        // var fileStream = fs.createReadStream(fileURL);
        // var csvStream = csv({ headers: true });

        // fileStream.pipe(csvStream);

        // var rows = [];
        // var onData = function (row) {
        //     rows.push(row);
        //     if (rows.length == 1) {
        //         row.forEach(col => {
        //             firstRow.push(col);
        //         })
        //         console.log(firstRow);
        //         resolve(firstRow)

        //         csvStream.emit('donereading'); //custom event for convenience
        //     }
        // };
        // csvStream.on('data', onData);
        // csvStream.on('donereading', function () {
        //     fileStream.close();
        //     csvStream.removeListener('data', onData);
        //     console.log('got 20 rows', rows);
        // });
    });
}
// var fs = require('fs');
// var csv = require('fast-csv');

// var fileStream = fs.createReadStream(fileURL);
// var csvStream = csv({headers: true});

// fileStream.pipe(csvStream);

// var rows = [];
// var onData = function(row){
//   rows.push(row);
//   if (rows.length == 20) {
//     csvStream.emit('donereading'); //custom event for convenience
//   }
// };
// csvStream.on('data', onData);
// csvStream.on('donereading', function(){
//   fileStream.close();
//   csvStream.removeListener('data', onData);
//   console.log('got 20 rows', rows);
// });

