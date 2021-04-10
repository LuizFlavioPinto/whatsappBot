const puppeteer = require("puppeteer")

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

let sendMessage = async (contactName, typeOfMessage, amountOfMessages, message) => {
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
        message = element
        element = await page.$$eval('span._3-8er.selectable-text.copyable-text > span', 
        el => el[el.length - 1].innerText)

        if (element != message && element != '') message = element, i = true

        // element != '' used because when the message is an emoji, the bot gets an error

        await delay(1500)
      }
    },
    randomFlood() {
      let characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
      'q','r','s','t','u','v','w','x','y','z','ç','!','@','#','$','%','¨','&','*','(',')',
      '-','_','+','=','`','´','[',']','{','}','^','~',',','<','.','>',':',';','/','?','°',
      '¹','²','³','£','¢','¬'];
    
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
  
  for (let i = 0; i < amountOfMessages; i++) {
    if(typeOfMessage == 'normalMessage')functions.normalMessage()
    if(typeOfMessage == 'randomFlood')functions.randomFlood()
    if(typeOfMessage == 'repeater')await functions.repeater()

    await page.keyboard.sendCharacter(message);
    await page.click("span[data-testid='send']");
  }
  await console.log('Finished')
}

sendMessage('Fernando', 'normalMessage', 10, 'FOGÃO SEMPRE PERTO DO TÍTULO')