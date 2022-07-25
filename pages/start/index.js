import { useEffect, useState, useRef } from 'react';
import randomWords from 'random-words';
import Head from 'next/head';
import Image from 'next/image';
import '../../styles/Home.module.css';
import { useRouter } from 'next/router';

const NUMB_OF_WORDS = 200;
const SECONDS = 60;

export default function Home() {
  const router = useRouter();
  const data = router.query;

  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(SECONDS);
  const [targetDuration, setDuration] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setInCorrect] = useState(0);
  const [status, setStatus] = useState('waiting');
  const [currentChartIndex, setCurrentChartIndex] = useState(-1);
  const [currentChar, setCurrentChar] = useState('');
  const [time, setTime] = useState('');
  const [ready, setReady] = useState(false);
  const textInput = useRef(null);

  // useEffect(() => {
  //   if (data.slug === 'default') {
  //     setWords(generateWords());
  //   }
  // }, []);

  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus();
    }
  }, [status]);

  const generateWords = () => {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  };
  const start = () => {
    if (status === 'finish') {
      setWords(generateWords());
      setCurrentInput('');
      setCurrentWordIndex(0);
      setCorrect(0);
      setInCorrect(0);
      setCurrentChartIndex(-1);
      setCurrentChar('');
    }

    if (status !== 'started') {
      setStatus('started');
      let interval = setInterval(() => {
        setCountDown((prevCountDown) => {
          if (prevCountDown === 0) {
            clearInterval(interval);
            setStatus('finish');
            setCurrentInput('');
            return SECONDS;
          } else {
            return prevCountDown - 1;
          }
        });
      }, 1000);
    }
  };

  const stop = () => {
    clearInterval();
    setStatus('finish');
    setCurrentInput('');
    speed();
    return SECONDS;
  };

  const speed = () => {
    let timeDiff = targetDuration - countDown;

    var timeTakenMins = Math.floor(timeDiff / 60);

    const netTypingSpeed = correct / timeTakenMins;

    console.log(netTypingSpeed);

    return netTypingSpeed;
  };

  const handleKeyDown = ({ keyCode, key }) => {
    // space bar
    if (keyCode === 32) {
      checkMatch();
      setCurrentInput('');
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentChartIndex(-1);
      // backspace
    } else if (keyCode === 8) {
      setCurrentChartIndex(currentChartIndex - 1);
      setCurrentChar(key);
    } else {
      setCurrentChartIndex(currentChartIndex + 1);
      setCurrentChar(key);
    }
  };

  const checkMatch = () => {
    const wordToCompare = words[currentWordIndex];
    const doesItMatch = wordToCompare === currentInput.trim();

    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setInCorrect(incorrect + 1);
    }
  };

  const getCharClass = (wordIdx, charIdx, char) => {
    if (
      wordIdx === currentWordIndex &&
      charIdx === currentChartIndex &&
      currentChar &&
      status != 'finish'
    ) {
      if (char === currentChar) {
        return 'has-background-success';
      } else {
        return 'has-background-danger';
      }
    } else if (
      wordIdx === currentWordIndex &&
      currentChartIndex >= words[currentWordIndex].length
    ) {
      return 'has-background-danger';
    } else {
      return '';
    }
  };

  const timeSet = () => {
    setReady(true);
    convertMinutesToSeconds(time);
    if (data.slug === 'custom') {
      var wordArray = [];
      wordArray = words.split(' ');
      setWords(wordArray);
    } else {
      setWords(generateWords());
      console.log(words.length);
    }
  };

  const convertMinutesToSeconds = (min) => {
    var seconds = min * 60;
    setDuration(seconds);
    setCountDown(seconds);
    return seconds;
  };

  return (
    <div>
      <Head>
        <link rel="canonical" href="https://preview.keenthemes.com/metronic8" />
        <link
          rel="shortcut icon"
          href="https://preview.keenthemes.com/metronic8/demo1/assets/media/logos/favicon.ico"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700"
        />
        {/* <link
          href="/assets/plugins/global/plugins.bundle.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/css/style.bundle.css"
          rel="stylesheet"
          type="text/css"
        /> */}
      </Head>

      <div class="box">
        {ready ? (
          <div className="container is-widescreen">
            <section>
              <div className="is-size-1 has-text-centered has-text-primary">
                <h2>{countDown}</h2>
              </div>
            </section>
            <div className="control is-expanded section">
              <input
                ref={textInput}
                disabled={status !== 'started'}
                type="text"
                className="input"
                onKeyDown={handleKeyDown}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
              />
            </div>
            <div className="section">
              {status === 'started' ? (
                <button
                  className="button is-danger is-fullwidth"
                  onClick={stop}
                >
                  Stop
                </button>
              ) : (
                <button className="button is-info is-fullwidth" onClick={start}>
                  Start
                </button>
              )}
            </div>
            {status === 'started' && (
              <div className="section">
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      {words.map((word, i) => (
                        <span key={i}>
                          <span>
                            {word.split('').map((char, idx) => (
                              <span
                                className={getCharClass(i, idx, char)}
                                key={idx}
                              >
                                {char}
                              </span>
                            ))}
                          </span>
                          <span> </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {status === 'finish' && (
              <div className="section">
                <div className="columns">
                  <div className="column has-text-centered">
                    <p className="is-size-5">Speed </p>
                    <p className="has-text-primary-is-size-1">{speed()}</p>
                  </div>
                  <div className="column has-text-centered">
                    <div className="is-size-5">Accuracy:</div>
                    <p className="has-text-info-is-size-1">
                      {Math.round((correct / words.length) * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : data.slug === 'default' ? (
          <div>
            <div>
              <h2>Enter time Duration and click next to proceed</h2>
            </div>
            <div class="field">
              <label class="label">Time Duration</label>
              <div class="control">
                <input
                  class="input"
                  type="number"
                  placeholder="TIme in minutes"
                  required
                  style={{ width: '20%' }}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <button
              class="button is-primary"
              disabled={time === ''}
              onClick={timeSet}
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <div>
              <h2>Enter time Duration and click next to proceed</h2>
            </div>
            <div class="field">
              <label class="label">Time Duration</label>
              <div class="control">
                <input
                  class="input"
                  type="number"
                  placeholder="TIme in minutes"
                  required
                  style={{ width: '20%' }}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Paragraph</label>
              <div class="control">
                <textarea
                  class="textarea"
                  placeholder="Textarea"
                  required
                  onChange={(e) => setWords(e.target.value)}
                ></textarea>
              </div>
            </div>

            <button
              disabled={words === '' || time === ''}
              class="button is-primary"
              onClick={timeSet}
            >
              Nexts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
