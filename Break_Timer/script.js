//Theme change start
const theme = { //Setting a object to keep the values of theme status
    greenTheme: 'off',
    blueTheme: 'off',
    pinkTheme: 'off'
};

let changingColor; //Setting some global variables
let greenCorrectMark;
let blueCorrectMark;
let pinkCorrectMark;

const changingTheme = () => {
    //Determine what values should be used 
    if (theme.greenTheme === 'on') {
        changingColor = '#A0DAA9';
        greenCorrectMark = '⇒';
        blueCorrectMark = '';
        pinkCorrectMark = '';
    } else if (theme.blueTheme === 'on') {
        changingColor = '#b3cee5';
        greenCorrectMark = '';
        blueCorrectMark = '⇒';
        pinkCorrectMark = '';
    } else if (theme.pinkTheme === 'on') {
        changingColor = '#F7CAC9';
        greenCorrectMark = '';
        blueCorrectMark = '';
        pinkCorrectMark = '⇒';
    }
    //Assign value to background color and arrow location
    const changingThemeColor = (colorTheme, green, blue, pink) => {
        $('body').css('background', colorTheme);
        $('button').css('background', colorTheme);
        $('.greenThemeSpan').text(green);
        $('.blueThemeSpan').text(blue);
        $('.pinkThemeSpan').text(pink);
    };
    changingThemeColor(changingColor, greenCorrectMark, blueCorrectMark, pinkCorrectMark);
};
//Theme change end
//Language change start
const languageSetting = {
    english: 'off',
    chinese: 'off'
};

const changingLanguage = () => {
    if (languageSetting.english === 'on') {
        $('.englishIconSpan').text('⇐');
        $('.chineseIconSpan').text('');
        $('.headerLeftSideContent').text('YUHUI\'S BREAK TIMER');
        $('.themeLogo').text('Theme');
        $('.greenThemeText').text('Green Ash');
        $('.blueThemeText').text('Serenity');
        $('.pinkThemeText').text('Rose Quartz');
        $('.languageButton').text('Language');
        $('.lunchTime').text('Lunch Time');
        $('.workBreak').text('Work Break');
        $('.coffeeTime').text('Coffee Time');
        $('.pomodoro').text('Pomodoro');
        $('.startButton').text('Start');
        $('.clearupButton').text('Reset');
        $('#reduceMinute').text('Reduce a minute');
        $('#reduceSecond').text('Reduce a second');
        $('#addMinute').text('Add a minute');
        $('#addSecond').text('Add a second');
        $('.timeTypeExplanation').text('Please Enter The Number Of:');
        $('.forCountdownTime').text('Countdown Time');
        $('.forAlarmTime').text('Alarm Time');
        $('.forSubmit').attr('value', 'Submit!');
        $('.cleanLog').text('Log Clean Up!')
        $('.footerCreated').text('Created at JUNO College of Technology');
    } else if (languageSetting.chinese === 'on') {
        $('.englishIconSpan').text('');
        $('.chineseIconSpan').text('⇐');
        $('.headerLeftSideContent').text('渝惠的休息计时器');
        $('.themeLogo').text('主题');
        $('.greenThemeText').text('绿灰');
        $('.blueThemeText').text('静谧蓝');
        $('.pinkThemeText').text('粉晶');
        $('.languageButton').text('语言切换');
        $('.lunchTime').text('午餐时间');
        $('.workBreak').text('工作休息');
        $('.coffeeTime').text('咖啡时间');
        $('.coffeeTime').text('咖啡时间');
        $('.pomodoro').text('番茄工作法');
        $('.startButton').text('开始');
        $('.clearupButton').text('重置');
        $('#reduceMinute').text('减一分');
        $('#reduceSecond').text('减一秒');
        $('#addMinute').text('加一分');
        $('#addSecond').text('加一秒');
        $('.timeTypeExplanation').text('请输入时间:');
        $('.forCountdownTime').text('倒计时（分：秒）');
        $('.forAlarmTime').text('提醒时（时：分）');
        $('.forSubmit').attr('value', '提交!');
        $('.cleanLog').text('记录清空!');
        $('.footerCreated').text('创建于朱诺理工学院');
    }
};
//Language change end
//Time setting start
let minsTensDigit = 0;
let minsOnesDigit = 0;
let secondsTensDigit = 0;
let secondsOnesDigit = 0;
//Time setting by button start
const timesettingtype = {
    lunchTimeType: 'false',
    workBreakType: 'false',
    coffeeTimeType: 'false',
    pomodoroType: 'false',
    resetType: 'false'
}
const lunchTimeSetting = () => {

    if (timesettingtype.lunchTimeType === 'true') { //30:00
        minsTensDigit = 3;
        minsOnesDigit = 0;
        secondsTensDigit = 0;
        secondsOnesDigit = 0;
    } else if (timesettingtype.workBreakType === 'true') { //05:00
        minsTensDigit = 0;
        minsOnesDigit = 5;
        secondsTensDigit = 0;
        secondsOnesDigit = 0;
    } else if (timesettingtype.coffeeTimeType === 'true') { //15:00
        minsTensDigit = 1;
        minsOnesDigit = 5;
        secondsTensDigit = 0;
        secondsOnesDigit = 0;
    } else if (timesettingtype.pomodoroType === 'true') { //25:00
        minsTensDigit = 2;
        minsOnesDigit = 5;
        secondsTensDigit = 0;
        secondsOnesDigit = 0;
    } else if (timesettingtype.resetType === 'true') { //00:00
        minsTensDigit = 0;
        minsOnesDigit = 0;
        secondsTensDigit = 0;
        secondsOnesDigit = 0;
    };
};
//Showing on the screen
const bottonTimeSetting = (minsTens, minsOnes, secondsTens, secondsOnes) => {
    $('#minsTens').text(minsTens);
    $('#minsOnes').text(minsOnes);
    $('#secondsTens').text(secondsTens);
    $('#secondsOnes').text(secondsOnes);
};
//Time setting by button end
//Time setting by textarea start
let calculationMethod = 'on'; //Default position is at countdowm time
let minuteValueTextarea;
let secondValueTextarea;
//Time setting by textarea end
//Time setting end
//Countdown function start
let startButtonStatus = false; // Switch on/off start button
let countdowmFunction;
const forUndefinedNumberSetting = () => { // If user has no input in any spot it goes 0
    if (secondsOnesDigit === undefined) { //If user did not input secondsOnes
        secondsOnesDigit = 0;
    };
    if (secondsTensDigit === undefined) { //If user did not input secondsTens
        secondsTensDigit = 0;
    };
    if (minsOnesDigit === undefined) { //If user did not input minOnes
        minsOnesDigit = 0;
    };
    if (minsTensDigit === undefined) { //If user did not input minTens
        minsTensDigit = 0;
    };
};
const countDown = function () {
    secondsOnesDigit--; //Countdown operation
    if (secondsOnesDigit === -1) { //Borrow from sec tens
        secondsOnesDigit = 9;
        secondsTensDigit--;
        if (secondsTensDigit === -1) { //Borrow from min ones
            secondsOnesDigit = 9;
            secondsTensDigit = 5;
            minsOnesDigit--;
            if (minsOnesDigit === -1) {  //Borrow from min tens
                secondsOnesDigit = 9;
                secondsTensDigit = 5;
                minsOnesDigit = 9;
                minsTensDigit--;
            };
        };
    };
    if (minsTensDigit == 0 && minsOnesDigit == 0) {
        if (secondsTensDigit < 1) {
            $('.mins').css('color', '#FDAC53'); //Marigold
            $('.betweenminsandsecs').css('color', '#FDAC53');
            $('.seconds').css('color', '#FDAC53');
        }; // Using  == here is because if we input like 09 08 07, 9 8 7 are used for calculation so they are going to be numbers but 0s are not in calculation so they are still strings 
        //we input like 11 12 13, all numbers are going to calculations so they are all number
        if (secondsTensDigit == 0 && secondsOnesDigit == 0) {
            window.clearInterval(countdowmFunction); //Stop countdown
            $('.mins').css('color', '#D2386C');  //Raspberry Sorbet
            $('.betweenminsandsecs').css('color', '#D2386C');
            $('.seconds').css('color', '#D2386C');
        };
    };
    bottonTimeSetting(minsTensDigit, minsOnesDigit, secondsTensDigit, secondsOnesDigit);
};
const turnBackToBlackFont = () => {
    $('.mins').css('color', 'black');
    $('.betweenminsandsecs').css('color', 'black');
    $('.seconds').css('color', 'black');
};
//Countdown function end
//Hover start
let hoverOutBackgroundColor = "#F7CAC9";
const hoverElementStyle = (element) => {
    $(element).hover(function () { //In function
        $(element).css("background-color", "rgba(239, 225, 206, 0.7)");
    },
        function () { //Out function
            if (theme.greenTheme === 'on') {
                hoverOutBackgroundColor = "#A0DAA9";
            } else if (theme.blueTheme === 'on') {
                hoverOutBackgroundColor = "#b3cee5";
            } else if (theme.pinkTheme === 'on') {
                hoverOutBackgroundColor = "#F7CAC9";
            };
            $(element).css("background-color", hoverOutBackgroundColor);
        }
    )
};
const hoverElementStyleReverse = (element) => {
    $(element).hover(function () { //In function
        if (theme.greenTheme === 'on') {
            hoverOutBackgroundColor = "#A0DAA9";
        } else if (theme.blueTheme === 'on') {
            hoverOutBackgroundColor = "#b3cee5";
        } else if (theme.pinkTheme === 'on') {
            hoverOutBackgroundColor = "#F7CAC9";
        };
        $(element).css("background-color", hoverOutBackgroundColor);
    },
        function () { //Out function
            $(element).css("background-color", "rgb(239, 225, 206)");
        },
    )
};
//Hover end

$(function () {
    //Theme change start
    $('.greenTheme').on('click', function () { //Switch to green theme
        theme.greenTheme = 'on';
        theme.blueTheme = 'off';
        theme.pinkTheme = 'off';
        changingTheme();
        //Record into the log
        const greenButtonClicked = `
                <li>
                    <p>Set the theme to green ash.</p>
                    <button class="importantButton">Mark it!</button>
                </li>
            `;
        $('.eventLog').append(greenButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    $('.blueTheme').on('click', function () { //Switch to blue theme
        theme.greenTheme = 'off';
        theme.blueTheme = 'on';
        theme.pinkTheme = 'off';
        changingTheme();
        //Record into the log
        const blueButtonClicked = `
            <li>
                <p>Set the theme to serenity blue.</p>
                <button class="importantButton">Mark it!</button>
            </li>
        `;
        $('.eventLog').append(blueButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    $('.pinkTheme').on('click', function () { //Switch to pink theme
        theme.greenTheme = 'off';
        theme.blueTheme = 'off';
        theme.pinkTheme = 'on';
        changingTheme();
        //Record into the log
        const pinkButtonClicked = `
            <li>
                <p>Set the theme to rose quartz.</p>
                <button class="importantButton">Mark it!</button>
            </li>
        `;
        $('.eventLog').append(pinkButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    //Theme change end
    //Language change start
    $('.englishLanguage').on('click', function () {//Switch to English
        languageSetting.english = 'on';
        languageSetting.chinese = 'off';
        changingLanguage();
        //Record into the log
        const englishButtonClicked = `
            <li>
                <p>Set the language to English.</p>
                <button class="importantButton">Mark it!</button>
            </li>
        `;
        $('.eventLog').append(englishButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    $('.chineseLanguage').on('click', function () { //Switch to Chinese
        languageSetting.english = 'off';
        languageSetting.chinese = 'on';
        changingLanguage();
        //Record into the log
        const chineseButtonClicked = `
            <li>
                <p>Set the language to Chinese.</p>
                <button class="importantButton">Mark it!</button>
            </li>
        `;
        $('.eventLog').append(chineseButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    //Language change end
    //Button time setting start
    $('.lunchTime').on('click', function () { //Lunck time button
        timesettingtype.lunchTimeType = 'true';
        window.clearInterval(countdowmFunction); //Stop countdown
        lunchTimeSetting();
        bottonTimeSetting(minsTensDigit, minsOnesDigit, secondsTensDigit, secondsOnesDigit);
        timesettingtype.lunchTimeType = 'false'; //Reset flag
        //Record into the log
        const lunchTimeButtonClicked = `
            <li>
                <p>Lunch time set.</p>
                <button class="importantButton">Mark it!</button>
            </li>
        `;
        turnBackToBlackFont ();
        $('.eventLog').append(lunchTimeButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    $('.workBreak').on('click', function () {  //Work break button
        timesettingtype.workBreakType = 'true';
        window.clearInterval(countdowmFunction); //Stop countdown
        lunchTimeSetting();
        bottonTimeSetting(minsTensDigit, minsOnesDigit, secondsTensDigit, secondsOnesDigit);
        timesettingtype.workBreakType = 'false'; //Reset flag
        //Record into the log
        const workBreakButtonClicked = `
            <li>
                <p>Work break set.</p>
                <button class="importantButton">Mark it!</button>
            </li>
        `;
        turnBackToBlackFont ();
        $('.eventLog').append(workBreakButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    $('.coffeeTime').on('click', function () { //Coffee time buton
        timesettingtype.coffeeTimeType = 'true';
        window.clearInterval(countdowmFunction); //Stop countdown
        lunchTimeSetting();
        bottonTimeSetting(minsTensDigit, minsOnesDigit, secondsTensDigit, secondsOnesDigit);
        timesettingtype.coffeeTimeType = 'false'; //Reset flag
        //Record into the log
        const coffeeTimeButtonClicked = `
            <li>
                <p>Coffee time set.</p>
                <button class="importantButton">Mark it!</button>
            </li>
        `;
        turnBackToBlackFont ();
        $('.eventLog').append(coffeeTimeButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    $('.pomodoro').on('click', function () { //Pomodoro button
        timesettingtype.pomodoroType = 'true';
        window.clearInterval(countdowmFunction); //Stop countdown
        lunchTimeSetting();
        bottonTimeSetting(minsTensDigit, minsOnesDigit, secondsTensDigit, secondsOnesDigit);
        timesettingtype.pomodoroType = 'false'; //Reset flag
        //Record into the log
        const pomodoroButtonClicked = `
            <li>
                <p>Pomodoro set.</p>
                <button class="importantButton">Mark it!</button>
            </li>
        `;
        turnBackToBlackFont ();
        $('.eventLog').append(pomodoroButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    $('.clearupButton').on('click', function () { //Time reset button
        timesettingtype.resetType = 'true';
        window.clearInterval(countdowmFunction); //Stop countdown
        lunchTimeSetting();
        bottonTimeSetting(minsTensDigit, minsOnesDigit, secondsTensDigit, secondsOnesDigit);
        timesettingtype.resetType = 'false'; //Reset flag
        turnBackToBlackFont(); // Reset the screen font color to black
        //Record into the log
        const resetButtonClicked = `
                <li>
                  <p>Your screen reset.</p>
                  <button class="importantButton">Mark it!</button>
                </li>
              `;
        $('.eventLog').append(resetButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    $('#reduceMinute').on('click', function () { //Reduce a min button
        forUndefinedNumberSetting(); // If user has no input in any spot it goes 0
        window.clearInterval(countdowmFunction); //Stop countdown
        minsOnesDigit--; //Operation
        if (minsOnesDigit === -1 && minsTensDigit === 0) {
            minsOnesDigit = 0;
            alert(`Gandalf: "YOU SHOULD NOT PASS A MINUTE DECUCTION ANYMORE!"`);
        } else if (minsOnesDigit === -1) { //Borrow one from min tens
            minsOnesDigit = 9;
            minsTensDigit--;
        };
        bottonTimeSetting(minsTensDigit, minsOnesDigit, secondsTensDigit, secondsOnesDigit);
        //Record into the log
        const reduceMinButtonClicked = `
                <li>
                  <p>You reduced a minute on the screen.</p>
                  <button class="importantButton">Mark it!</button>
                </li>
              `;
        $('.eventLog').append(reduceMinButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    $('#reduceSecond').on('click', function () {//Reduce a sec button
        window.clearInterval(countdowmFunction); //Stop countdown
        forUndefinedNumberSetting(); // If user has no input in any spot it goes 0
        secondsOnesDigit--; //Operation
        if (secondsOnesDigit === -1) { //Borrow one from sec tens
            secondsOnesDigit = 9;
            secondsTensDigit--;
            if (secondsTensDigit === -1) { //Borrow one from min ones
                minsOnesDigit--;
                secondsTensDigit = 5;
                secondsOnesDigit = 9;
                if (minsOnesDigit === -1) { //Borrow one from min tens
                    minsTensDigit--;
                    minsOnesDigit = 9;
                    secondsTensDigit = 5;
                    secondsOnesDigit = 9;
                    if (minsTensDigit === -1) { //Prohibit the operation
                        minsTensDigit = 0;
                        minsOnesDigit = 0;
                        secondsTensDigit = 0;
                        secondsOnesDigit = 0;
                        alert(`Gandalf: "YOU SHOULD NOT PASS A SECOND DECUCTION ANYMORE!"`);
                    };
                };
            };
        };
        if (secondsOnesDigit === -1 && secondsTensDigit === 0) {
            minsOnesDigit--;
            secondsTensDigit = 5;
            secondsOnesDigit = 9;
        };
        if (minsTensDigit === 0 && minsOnesDigit === 0 && secondsTensDigit === 0 && secondsOnesDigit === 0) {
            window.clearInterval(countdowmFunction); //Stop countdown
        }
        bottonTimeSetting(minsTensDigit, minsOnesDigit, secondsTensDigit, secondsOnesDigit);
        //Record into the log
        const reduceSecButtonClicked = `
                <li>
                  <p>You reduced a second on the screen.</p>
                  <button class="importantButton">Mark it!</button>
                </li>
              `;
        $('.eventLog').append(reduceSecButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    $('#addMinute').on('click', function () { //Add a min button
        window.clearInterval(countdowmFunction); //Stop countdown
        forUndefinedNumberSetting(); // If user has no input in any spot it goes 0
        minsOnesDigit++; //Operation
        if (minsOnesDigit === 10) { //Carrying to min tens
            minsOnesDigit = 0;
            minsTensDigit++;
        };
        if (minsTensDigit === 0 && minsOnesDigit >= 1) {
            turnBackToBlackFont(); //Reset the screen font color. Turn back to black if the timer reached at 00:00 then user uses add sec boton to add the number
        };
        bottonTimeSetting(minsTensDigit, minsOnesDigit, secondsTensDigit, secondsOnesDigit);
        //Record into the log
        const addMinButtonClicked = `
                <li>
                  <p>You added a minute on the screen.</p>
                  <button class="importantButton">Mark it!</button>
                </li>
              `;
        $('.eventLog').append(addMinButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    $('#addSecond').on('click', function () { //Add a sec button
        window.clearInterval(countdowmFunction); //Stop countdown
        forUndefinedNumberSetting(); // If user has no input in any spot it goes 0
        secondsOnesDigit++; //Operation
        if (secondsOnesDigit === 10) { //Carrying to sec tens
            secondsOnesDigit = 0;
            secondsTensDigit++;
        };
        if (secondsTensDigit === 6) { //Carrying to min ones
            secondsTensDigit = 0;
            minsOnesDigit++;
        };
        if (minsOnesDigit === 10) { //Carrying to min tens
            minsOnesDigit = 0;
            minsTensDigit++;
        };
        if (minsTensDigit === 0 && minsOnesDigit === 0 && secondsTensDigit >= 1) {
            turnBackToBlackFont(); //Turn back to black if the timer reached at 00:00 then user uses add sec boton to add the number
        };
        if (minsTensDigit === 0 && minsOnesDigit === 0 && secondsTensDigit === 0 && secondsOnesDigit >= 1) {
            $('.mins').css('color', '#FDAC53');  ////Turn back to yellow if the timer reached at 00:00 then user uses add sec boton to add the number
            $('.betweenminsandsecs').css('color', '#FDAC53');
            $('.seconds').css('color', '#FDAC53');
        };
        bottonTimeSetting(minsTensDigit, minsOnesDigit, secondsTensDigit, secondsOnesDigit);
        //Record into the log
        const addSecButtonClicked = `
                <li>
                  <p>You added a second on the screen.</p>
                  <button class="importantButton">Mark it!</button>
                </li>
              `;
        $('.eventLog').append(addSecButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    //Button time setting end
    //Textarea time setting start
    //Check textarea input type (countdown or alarm?)
    $('input[type=radio][name=timeInputType]').change(function () {
        if (this.value === "countdowmTime") {
            calculationMethod = "on";
            //Record into the log
            const countdownRadioChoosed = `
                <li>
                    <p>Countdown function choosed.</p>
                    <button class="importantButton">Mark it!</button>
                </li>
             `;
            $('.eventLog').append(countdownRadioChoosed);
            $('.cleanLog').css('display', 'block');
        }
        else if (this.value === "alarmTime") {
            calculationMethod = "off";
            //Record into the log
            const beBaclRadioChoosed = `
                <li>
                    <p>Be-back function choosed.</p>
                    <button class="importantButton">Mark it!</button>
                </li>
             `;
            $('.eventLog').append(beBaclRadioChoosed);
            $('.cleanLog').css('display', 'block');
        };
    });
    //Get the value from textarea after clicking submit button
    $('.forSubmit').on('click', function (event) {
        event.preventDefault(); //Hold the click function always working
        window.clearInterval(countdowmFunction); //Stop countdown
        minuteValueTextarea = $('#inputMinute').val();
        secondValueTextarea = $('#inputSecond').val();
        if (calculationMethod === "on") {
            minsTensDigit = minuteValueTextarea.split('')[0];
            minsOnesDigit = minuteValueTextarea.split('')[1];
            secondsTensDigit = secondValueTextarea.split('')[0];
            secondsOnesDigit = secondValueTextarea.split('')[1];
            bottonTimeSetting(minsTensDigit, minsOnesDigit, secondsTensDigit, secondsOnesDigit);
        };
        if (calculationMethod === "off") {
            let realTime = new Date(); //Get the local time
            let realTimeHour = realTime.getHours();
            let realTimeMinute = realTime.getMinutes();
            let differenceMins;
            let differenceHrs;
            let totalMins;
            if (minuteValueTextarea > 23) { //Now minuteValueTextarea is hour input
                alert(`"Warning! Warning! It is too much for a day has over 24 hrs!"`);
            };
            if (secondValueTextarea > 59) { // Now secondValueTextare is minute input
                alert(`"Warning! Warning! It is too much for a hour has over 60 mins!"`);
            };
            if (secondValueTextarea >= realTimeMinute) { //Mins minus mins
                differenceMins = secondValueTextarea - realTimeMinute;
            } else if (secondValueTextarea < realTimeMinute) {
                differenceMins = secondValueTextarea - realTimeMinute + 60;
                minuteValueTextarea--;
            };
            if (minuteValueTextarea >= realTimeHour) { //Hrs minus hrs
                differenceHrs = minuteValueTextarea - realTimeHour;
            } else if (minuteValueTextarea < realTimeHour) { //When input time is on next day
                differenceHrs = minuteValueTextarea - realTimeHour + 24;
                alert(`"You are talking about the time on tomorrow? No problem! Let's do it!"`);
            };
            totalMins = differenceMins + (differenceHrs * 60); //Total mins
            //It is estimated that our timer is used for counting period less than one day, some the maximum minute number on our screen is 1440 mins --- four figures
            totalMins = totalMins.toString();
            if (totalMins.length === 4) { //When four figures
                minsTensDigit = totalMins.substring(0, 3);
                minsOnesDigit = totalMins.substring(3, 4);
            } else if (totalMins.length === 3) { //When three figures
                minsTensDigit = totalMins.substring(0, 2);
                minsOnesDigit = totalMins.substring(2, 3);
            } else if (totalMins.length === 2) { //When two figures
                minsTensDigit = totalMins.substring(0, 1);
                minsOnesDigit = totalMins.substring(1, 2);
            } else if (totalMins.length === 1) {
                minsTensDigit = 0;
                minsOnesDigit = totalMins.substring(0, 1);
            }
            secondsTensDigit = 0;
            secondsOnesDigit = 0;
            bottonTimeSetting(minsTensDigit, minsOnesDigit, secondsTensDigit, secondsOnesDigit);
        };
        $('#inputMinute').val("");//Reset textarea after submit
        $('#inputSecond').val("");
        turnBackToBlackFont(); //Turn back to black if the timer reached at 00:00 or sec tens less than 1 then user uses this button
        //Record into the log
        const submitButtonClicked = `
                <li>
                  <p>Your time input submited.</p>
                  <button class="importantButton">Mark it!</button>
                </li>
              `;
        $('.eventLog').append(submitButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    //Textarea time setting end
    //Start button countdown start
    $('.startButton').on('click', function () {
        forUndefinedNumberSetting(); // If user has no input in any spot it goes 0
        if (minsTensDigit === 0 && minsOnesDigit === 0 && secondsTensDigit === 0 && secondsOnesDigit === 0) {
            window.clearInterval(countdowmFunction); //Stop countdown

        } else {
            startButtonStatus = !startButtonStatus;

            if (startButtonStatus === true) { //Start countdown
                countdowmFunction = window.setInterval(countDown, 1000);
            } else {
                window.clearInterval(countdowmFunction); //Stop countdown
            };
        };
        //Record into the log
        const startButtonClicked = `
        <li>
          <p>Start button clicked.</p><button class="importantButton">Mark it!</button>
        </li>
      `;
        $('.eventLog').append(startButtonClicked);
        $('.cleanLog').css('display', 'block');
    });
    //Start button countdown end
    //Hover function start
    hoverElementStyle('.themeLogo');
    hoverElementStyle('.greenTheme button');
    hoverElementStyle('.blueTheme button');
    hoverElementStyle('.pinkTheme button');
    hoverElementStyle('.languageButton');
    hoverElementStyle('.englishLanguage button');
    hoverElementStyle('.chineseLanguage button');
    hoverElementStyle('.lunchTime');
    hoverElementStyle('.workBreak');
    hoverElementStyle('.coffeeTime');
    hoverElementStyle('.pomodoro');
    hoverElementStyle('.startButton');
    hoverElementStyle('.clearupButton');
    hoverElementStyle('#reduceMinute');
    hoverElementStyle('#reduceSecond');
    hoverElementStyle('#addSecond');
    hoverElementStyle('#addMinute');
    hoverElementStyle('.cleanLog');
    hoverElementStyleReverse(".forSubmit");
    //Important button is different it is not exist in html
    $('.eventLog').on('mouseleave', '.importantButton', function () {
        if (theme.greenTheme === 'on') {
            hoverOutBackgroundColor = "#A0DAA9";
        } else if (theme.blueTheme === 'on') {
            hoverOutBackgroundColor = "#b3cee5";
        } else if (theme.pinkTheme === 'on') {
            hoverOutBackgroundColor = "#F7CAC9";
        };
        $(this).css("background-color", hoverOutBackgroundColor);
    })
    .on('mouseenter', '.importantButton', function () { //Out function
        $(this).css("background-color", "#FDAC53"); //Marigold
        //If do not use `this`, all buttons change color
    });
    //Hover function end
    //Log button start
    $('.cleanLog').on('click', function () {
        $('.eventLog').empty();
        $('.cleanLog').css('display', 'none');
    });
    //Log button end
    //Log important button start
    $('.eventLog').on('click', '.importantButton', function () {
        $(this).parent('li').toggleClass('importantstyle');
        // Add a sign for the important mark
    });
    //Log important button end
});