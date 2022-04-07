import React, { Component } from 'react';
import './SortingVisualizer.css';
import { mergeSort } from '../SortingAlgorithms/MergerSort';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';


export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            array : [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i = 0; i<300; i++){
            array.push(randomIntFrom(5,600));
        }
        this.setState({array});
    }


    mergeSortAlgo() {
        const animations = mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

    render() {
        const {array} = this.state;
        return (
            <>
            <nav class = "nav-bar">
                 <button className = "nav-btn" onClick = {() => this.resetArray()}><span>Generate New Array</span></button>
                 <p className= "nav-text"><span>Sorting Visualizer</span></p>
                 <button className = "nav-btn" onClick ={() => this.mergeSortAlgo()}><span>Merge Sort</span></button>
            </nav>
            <div className='array-container'>
                        {array.map((value, index) => (
                            <div 
                        className='array-bar' 
                        key={index}
                        style={{height: `${value}px`}}>
                    </div>
                 ))}
            </div>
            </>     
        );
    }
}

function randomIntFrom(start, end){
    return Math.floor(Math.random() * (end - start + 1) + start);
}