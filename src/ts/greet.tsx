import * as React from "react";
import * as ReactDOM from "react-dom";

import {SlideChild, SlideProps, SliderProps, State} from "structure"

class Slide extends React.Component<SlideProps, {}> {
  constructor(props:SlideProps) {
    super(props)
  }
  render() {

    const props = this.props

    function renderElement(elementType: string, className?: string,
      style?: {[index: string]: string}, classIn?: string, src?: string,
      link?: string, text?: string,  children: SlideChild[] = []): JSX.Element {
        let result: JSX.Element
        let classString = ""

        if (className) classString += className 
        if (className && classIn && props.active) classString += " "
        if (classIn &&  props.active) classString += classIn 

        let style0: {[index: string]: string} = {}

        if (props.active) style0 = style

        switch(elementType) {
          case 'block': 
            return <div className={classString} style={style0}>{text} {
              children.map (y =>
                renderElement(y.elementType, y.className, y.style,y.classIn, y.src, y.link, y.text)
              )
            }
          </div>
          
          case 'img': return <img src={src} className={classString} style={style0}  />

          case 'linked-img': return <a href={link}>
            <img src={src} className={classString} style={style0} />
          </a>
          default: return <div />
        }

    }


    let classString = "slider__slide"
    if(props.className) classString += " " + props.className

    return <div className={classString} data-active={props.active} style={props.style}>

        <div className="slider__slide__text">
          {
            props.text && <a href={props.link}>{props.text}</a>
          }
        </div>
        {props.containers && props.containers.map (x => 
          renderElement(x.elementType, x.className, x.style,x.classIn, x.src, x.link, x.text, x.children))}
    </div>
  }
}



export default class Slider extends React.Component<SliderProps, State> {

  timer: number

  constructor(props:SliderProps) {
    super(props)
    this.previousSlide = this.previousSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.state = { active: 0 }
  }

  nextSlide(){
    let slide
    const activeSlide = this.state.active
    if (activeSlide + 1 < this.props.list.length) slide = activeSlide + 1
    else slide = 0

    if (slide == 0) slide = 1 

    this.setState({active: slide}) 
  }

  previousSlide() {
    let slide
    const activeSlide = this.state.active
    if (activeSlide - 1 <= 0) slide = this.props.list.length - 1
    else slide = activeSlide - 1

    // if (slide == 0) this.props.list.length - 1

    this.setState({active: slide}) 
  }

  componentDidMount(){
    if(this.timer) window.clearTimeout(this.timer)
    
    function onLoadPromise(img:HTMLImageElement) {
      if (img.complete) {
        return Promise.resolve(img.src);
      } else {
        const p = new Promise((success) => {
          img.onload = (e) => {
            success(img.src);
          };
        });
        return p;
      }
    }


    if (this.props.preloads && this.props.preloads.length > 0) {
    const promises = this.props.preloads.map(s => {
      const img = document.createElement("img")
      img.src = s
      onLoadPromise(img)
    })

    Promise.all(promises).then((ignore) => this.nextSlide())
    
    } else this.timer = window.setTimeout(this.nextSlide, 5000)
  }
    
  componentDidUpdate() {
    if(this.timer) window.clearTimeout(this.timer)
    this.timer = window.setTimeout(this.nextSlide, 8000)
  }

  componentWillUnmount() {
    if(this.timer) window.clearTimeout(this.timer)
  }


  
  render() {
    const slides = this.props.list
    return <div className="slider">
      {slides.map((slide, index, array) =>
        <Slide style={slide.style} className={slide.className} text={slide.text} containers={slide.containers} active={index == this.state.active} link={slide.link} /> 
       )}
       
       
         {
           this.props.generals.controlsType && <div className="controls">
            <div className="slider__next" onClick={this.nextSlide}>
              <i className="fa fa-4x fa-arrow-circle-right"></i>
            </div>
            <div className="slider__previous" onClick={this.previousSlide}>
              <i className="fa fa-4x fa-arrow-circle-left"></i>
            </div>
          </div>
         }
       </div>

  }
}


