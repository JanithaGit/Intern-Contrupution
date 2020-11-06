import React from 'react'
import { shallow } from 'enzyme/build'
import App from './App'
import ChartLineSimple from './views/Charts/ChartLineSimple'
import Dashboard from './views/Articles/Articles.js'


it('mounts without crashing', () => {
  const wrapper = shallow(<App/>)
  wrapper.unmount()
})

it('mounts dashboard without crashing', () => {
  const wrapper = shallow(<Articles/>)
  wrapper.unmount()
})

it('mounts Charts without crashing', () => {
  const wrapper = shallow(<ChartLineSimple/> )
  wrapper.unmount()
})
