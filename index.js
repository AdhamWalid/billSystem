const { time } = require('console');
const fs = require('fs');
const prompt = require('prompt')
const {table} = require('table');

// Date
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

// Styling
const chalk = require('chalk');
const { exit } = require('process');
const log = console.log;
let success = chalk.green
prompt.start()
let properties =[
    {
      name: 'choice',
      type: 'string', // Number will create an error
      message: 'Choose 1 , 2 , 3',
      required: true
    },
]

log(chalk`Welcome to {yellow ${'Bill Generator'}}\n\nChoose:\n(1) Create bill\n(2) View bill\n(3) Exit`)

prompt.get(properties, function(err , result){

    log(result)
    log(err)


if (result.choice.includes('1')){
    console.clear()
    log(chalk`{yellow Please Provide the following:}`)

    let properties2 =[
        {
          name: 'title',
          type: 'string',
          message: 'Name of product',
          required: true
        },
        {
            name: 'price',
            type: 'number',
            message: 'Enter number value.',
            required: true
          },
    ]

    prompt.get(properties2 , function (err , result){
    
        let data = [
            [result.title ,  result.price+'RM'],
        ]

        const config = {
            columnDefault: {
            width: 30,
            },
            header: {
            alignment: 'center',
            content: `Bill Created at ${today.toUTCString()}`,
            },
        }

        fs.writeFile('bill.txt', table(data,config) , function (err) {
            if (err) throw err;
            log(success`Succesfully Logged Bill. , Open Bill file to view saved bill.`);
        });    
            

    })


}else if (result.choice.includes('2')){

    fs.readFile('bill.txt', 'utf8', function (err, data) {

        console.log(chalk.red(data));

    });


}else if (result.choice.includes('2')){

    console.clear()
    log('Okay boss , Have a great day.')
    
}

})

