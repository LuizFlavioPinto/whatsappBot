const puppeteer = require("puppeteer"),
      contactName = require("./config.json").ContactName,
      typeOfMessage = require('./config.json').TypeOfMessage,
      amountOfMessages = require('./config.json').AmountOfMessages,
      message = require('./config.json').Message;
      
      

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

(async (contactName, typeOfMessage, amountOfMessages, message) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com/");

  await page.waitForSelector(`span[title='${contactName}']`)
  await page.click(`span[title='${contactName}']`);

  const editor = await page.$("div[data-tab='6']");
  await editor.focus();

  let element

  const functions = {
    normalMessage () {
      message = message
    },
    async repeater () {
      for(let i = false; i == false; i = i){
        element = await page.$$eval('span._3-8er.selectable-text.copyable-text > span', 
        el => el[el.length - 1].innerText)

        if (element != message && element != '') message = element, i = true

        /*  element != '' used because when the message is an emoji, the el.innerText
            returns a ''
        */
        await delay(1500)
      }
    },
    randomFlood() {
      let characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
      'q','r','s','t','u','v','w','x','y','z','ç','!','@','#','$','%','¨','&','*','(',')',
      '-','_','+','=','`','´','[',']','{','}','^','~',',','<','.','>',':',';','/','?','°',
      '¹','²','³','£','¢','¬','|'];
    
      function randomWord() {
        let generatedNumber = Math.floor(Math.random() * ((characters.length - 1) - 0) + 0)
        return generatedNumber
      }
    
      message = ''
      
      for(let i = 0; i < 844; i++){
        message += characters[randomWord()]
      }  
    }
  }

  function treatTypeOfMessageVariable () {
    typeOfMessage = typeOfMessage.toLowerCase().replace(/\s/g, '')
  }

  treatTypeOfMessageVariable()
  
  for (let i = 0; i < amountOfMessages; i++) {
    if(typeOfMessage === 'normalmessage')functions.normalMessage()
    if(typeOfMessage ==='randomflood')functions.randomFlood()
    if(typeOfMessage === 'repeater')await functions.repeater()

    await page.keyboard.sendCharacter(message);
    await page.click("span[data-testid='send']");
  }
  await console.log('Finished')
})(contactName, typeOfMessage, amountOfMessages, message)