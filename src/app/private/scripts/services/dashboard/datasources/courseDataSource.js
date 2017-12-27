/**
 * @author Nilesh More <nilesh_m@tekditechnologies.com>
 */

'use strict'

angular.module('playerApp')
  .service('courseDataSource', ['$q', '$rootScope', 'config', 'httpAdapter', 'toasterService', function ($q,
    $rootScope, config, httpAdapter, toasterService) {
    /**
     * @class dashboardService
     * @desc Service to manage dashboard.
     * @memberOf Services
     */
    var datasets = {
      'progress': config.URL.DASHBOARD.COURSE_PROGRESS,
      'consumption': config.URL.DASHBOARD.COURSE_CONSUMPTION
    }
    /**
     * @method getData
     * @desc get course dashboard data based on datasetTye
     * @memberOf Services.orgDataSource
     * @param {Object}  req - Request object
     * @param {string}  datasetType - Data set type
     * @param {object} headers headers
     * @returns promise
     * @instance
     */
    this.getData = function (req, datasetType, headers) {
      var url = config.URL.BASE_PREFIX + config.URL.LEARNER_PREFIX + datasets[datasetType] + '/' +
      req.courseId + '?period=' + req.timePeriod
      var deferred = $q.defer()
      var response = httpAdapter.httpCall(url, '', 'GET', headers)
      response.then(function (res) {
        if (res && res.responseCode === 'OK') {
          deferred.resolve(res)
        } else {
          toasterService.error($rootScope.messages.fmsg.m0075)
          deferred.reject(res)
        }
      }, function (err) {
        toasterService.error($rootScope.messages.emsg.m0005)
        deferred.reject(err)
      })
      return deferred.promise
    }
  }])
