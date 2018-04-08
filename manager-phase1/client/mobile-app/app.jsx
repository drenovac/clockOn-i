import React from 'react'
import { ReactiveVar } from 'meteor/reactive-var'
import {FlowRouter} from 'meteor/kadira:flow-router'
import {mount} from 'react-mounter'
import MainLayout from './containers/MainLayout'

FlowRouter.route("/", {
  name: "home",
  action(){
    var metaInfo = {name: "viewport", content: "user-scalable=no, width=device-width, maximum-scale=1, initial-scale=1, minimum-scale=1"};
    DocHead.addMeta(metaInfo);
    mount(MainLayout)
  }
})


