import { toHHMMSS } from "./timeConventer.js";

export const getTestsDetails = (allTests) => {
  const timerFifteen = allTests.filter(
    (test) => test.testType === "Timer, 15 seconds"
  );
  const timerThirty = allTests.filter(
    (test) => test.testType === "Timer, 30 seconds"
  );
  const timerSixty = allTests.filter(
    (test) => test.testType === "Timer, 60 seconds"
  );
  const timerTwoMinute = allTests.filter(
    (test) => test.testType === "Timer, 120 seconds"
  );

  const wordsTen = allTests.filter((test) => test.testType === "Words, 10");
  const wordsTwenyFive = allTests.filter(
    (test) => test.testType === "Words, 25"
  );
  const wordsFifty = allTests.filter((test) => test.testType === "Words, 50");
  const wordsHungred = allTests.filter(
    (test) => test.testType === "Words, 100"
  );

  const totalSeconds = allTests.reduce((acc, test) => {
    return acc + test.time;
  }, 0);

  return {
    testCompleted: allTests.length,
    timeSpended: toHHMMSS(totalSeconds),
    topWpm: Math.max(...allTests.map((test) => test.wpm)),
    averageWpm: +(
      allTests.reduce((acc, test) => acc + test.wpm, 0) / allTests.length
    ).toFixed(0),
    averageAccuracy: +(
      allTests.reduce((acc, test) => acc + test.accuracy, 0) / allTests.length
    ).toFixed(0),

    timerFifteenTopWpm: Math.max(...timerFifteen.map((test) => test.wpm)),
    timerThirtyTopWpm: Math.max(...timerThirty.map((test) => test.wpm)),
    timerSixtyTopWpm: Math.max(...timerSixty.map((test) => test.wpm)),
    timerTwoMinuteTopWpm: Math.max(...timerTwoMinute.map((test) => test.wpm)),

    wordsTenTopWpm: Math.max(...wordsTen.map((test) => test.wpm)),
    wordsTwenyFiveTopWpm: Math.max(...wordsTwenyFive.map((test) => test.wpm)),
    wordsFiftyTopWpm: Math.max(...wordsFifty.map((test) => test.wpm)),
    wordsHungredTopWpm: Math.max(...wordsHungred.map((test) => test.wpm)),
  };
};
