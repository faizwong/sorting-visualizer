import React, { useState, Fragment } from 'react';

import Bar from './components/Bar';

function App() {

  const [list, setList] = useState(generateNewArray());
  const [showNew, setShowNew] = useState(false);

  const animateInsertionSort = (a) => {

    const animation = [];

    const len = a.length;
    for (let i = 1; i < len; i++) {
      let key = a[i];
      let j = i - 1;
      animation.push([1, j]);
      while (j >= 0 && a[j] > key) {
        animation.push([1, j + 1]);
        a[j + 1] = a[j];
        animation.push([2, j + 1, a[j]])
        j = j - 1;
      }
      a[j + 1] = key;
      animation.push([2, j + 1, key])
    }

    animate(animation);
  }

  const animateBubbleSort = (a) => {

    const animation = [];

    const len = a.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (a[j] > a[j + 1]) {
          animation.push([1, j]);
          animation.push([1, j + 1]);
          let temp = a[j];
          a[j] = a[j + 1];
          animation.push([2, j, a[j + 1]])
          a[j + 1] = temp;
          animation.push([2, j + 1, temp])
        }
      }
    }

    animate(animation);
  }

  const animateMergeSort = (a) => {

    const animation = [];

    const sort = (unsortedArray, startIndex, endIndex) => {

      if (unsortedArray.length <= 1) {
        return unsortedArray;
      }

      const middle = Math.floor(unsortedArray.length / 2);

      const left = unsortedArray.slice(0, middle);
      const right = unsortedArray.slice(middle);

      return merge(sort(left, startIndex, endIndex - middle - 1), sort(right, startIndex + middle, endIndex), startIndex, endIndex, middle);
    }

    const merge = (left, right, startIndex, endIndex, middle) => {
      let resultArray = [], leftIndex = 0, rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
        animation.push([1, startIndex + leftIndex]);
        animation.push([1, startIndex + middle + rightIndex]);
        if (left[leftIndex] < right[rightIndex]) {
          resultArray.push(left[leftIndex]);
          leftIndex++;
        } else {
          resultArray.push(right[rightIndex]);
          rightIndex++;
        }
      }
      const result = resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
      result.forEach((item, index) => {
        animation.push([2, startIndex + index, item]);
      })

      return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    sort(a, 0, a.length - 1);
    animate(animation);
  }

  const animate = (a) => {

    a.forEach((item, index) => {
      setTimeout(() => {
        let category = item[0];
        let id = item[1];
        if (category === 1) {
          document.getElementById(`${id}`).style.background = 'red';
        } else {
          let newHeight = item[2] * 10;
          document.getElementById(`${id}`).style.height = `${newHeight}px`;

          const len = list.length;      
          for (let i = 0; i < len; i++) {
            document.getElementById(`${i}`).style.background = 'blue';
          }
        }
      }, index * 50);
    });

  }

  const resetList = () => {
    // https://stackoverflow.com/questions/8860188/javascript-clear-all-timeouts
    let id = window.setTimeout(function() {}, 0);
    while (id--) {
      window.clearTimeout(id);
    }

    for (let i = 0; i < list.length; i++) {
      document.getElementById(`${i}`).style.background = 'blue';
    }
    setList(generateNewArray());
    setShowNew(!showNew);
  }

  return (
    <div>
      <div style={ buttonContainerStyle }>
        {
          showNew ?
          <button style={ buttonStyle } onClick={ resetList }>New</button>
          :
          <Fragment>
            <button style={ buttonStyle } onClick={ () => { animateBubbleSort(list.slice()); setShowNew(!showNew); } }>Bubble Sort</button>
            <button style={ buttonStyle } onClick={ () => { animateInsertionSort(list.slice()); setShowNew(!showNew); } }>Insertion Sort</button>
            <button style={ buttonStyle } onClick={ () => { animateMergeSort(list.slice()); setShowNew(!showNew); } }>Merge Sort</button>
          </Fragment>

        }
      </div>
      <div style={ displayContainerStyle }>
        <div style={ displayStyle }>
          {
            list.map((item, index) => {
              return <Bar value={item} key={index} id={index}/>
            })
          }
        </div>
      </div>
    </div>
  );

}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateNewArray = () => {
  const MIN = 5;
  const MAX = 30;
  const LENGTH = 25;

  const result = [];
  for (let i = 0; i < LENGTH; i++) {
    result.push(getRandomInt(MIN, MAX));
  }

  return result;
}


const displayContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '70vh',
  width: '100vw'
};

const displayStyle = {
  display: 'flex'
};

const buttonContainerStyle = {
  height: '30vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const buttonStyle = {
  width: '120px',
  height: '30px',
  background: 'lightgray',
  fontSize: '1rem',
  marginBottom: '10px'
};

export default App;
