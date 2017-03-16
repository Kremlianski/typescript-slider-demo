export interface SlideContainer {
  elementType: string
  className?: string
  style?: {[index: string]: string}
  children?: SlideChild[]
  classIn?: string
  src? : string
  link?: string
  text?: string
}

export interface SlideChild {
  elementType: string
  style?: {[index: string]: string}
  text?: string
  src? : string
  link?: string
  className?: string
  classIn?: string
}

export interface SliderControls {
  controlsType: string
}


export interface SlideProps {
  style?: {[index: string]: string}
  text?: string
  className?: string
  link?: string
  containers?: SlideContainer[]
  active: boolean
}

export interface SliderProps {
  list: SlideProps[]
  generals: SliderGenerals
  preloads: string[]
}

export interface SliderGenerals {
  controlsType?: string
  delay: number
  firstDelay: number
}


export interface State {
  active: number
}