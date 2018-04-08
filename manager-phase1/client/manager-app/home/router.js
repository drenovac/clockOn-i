import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'
import {mount} from 'react-mounter'
import Layout from '../layout/containers/ManagerHome'
import Home from './components/Home'
import SideBar from './components/SideBar'

FlowRouter.route('/manager', {
  name: "manager-home",
  action() {
    mount(Layout, {content: <Home />, sidebar: <SideBar />})
  }
})