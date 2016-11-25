/*

DONT USE THIS SHITTY APP NO MORE plz
*/


var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/xml-originals/TestGBDataThirteenMonthsBinnedDaily.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.log(result.feed.entry);
        fs.writeFileSync('./data.json', JSON.stringify(result).split(",").join("\n") , 'utf-8');
        console.log('Done');
    });
});
