import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'
import {mount} from 'react-mounter'
import MainLayout from './AdminContainer'
import AdminReport from './report/AdminReportContainer'

if (!Meteor.isCordova) {
  FlowRouter.route("/admin", {
    action(){
      mount(MainLayout, {content: <AdminReport />})
    }
  })
}


