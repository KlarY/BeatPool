"use strict";

function sm_Note() {
    this.x = 0;
    this.pitch = undefined;
    this.duration = 1;
    this.type = '';
    return this;
}

sm_Note.prototype._name = "sm_Note"

sm_Note.prototype.construtor = function () {
    this.duration = 1;
    return this;
}
sm_Note.prototype.toString = function () {
    var input = this.pitch.step;
    var result = '';
    if (input == 'C') result = '1';
    else if (input == 'D') result = '2';
    else if (input == 'E') result ='3';
    else if (input == 'F') result ='4';
    else if (input == 'G') result ='5';
    else if (input == 'A') result ='6';
    else if (input == 'B') result ='7';
    else if (input == 'X') result ='0';
    
    if ( this.duration % 3 == 0)
        result += '.';
    return result;
}

sm_Note.prototype.parseStoreModels = function (storeModel) {
    if (typeof storeModel == "undefined") {
        return undefined;
    }
    if (Array.isArray(storeModel)) {
        return _.map(angular.copy(storeModel), function (sm) {
            return (new sm_Note()).parseStoreModels(sm);
        });
    } else {
        this.x = parseFloat(storeModel['-default-x'] || 1.0);
        this.pitch = angular.copy(storeModel['pitch']) || {
            'step': 'X'
        };
        this.duration = parseInt(storeModel['duration']);
        this.type = storeModel['type'];
        this.tie = angular.copy(storeModel['tie'])
        this.notations = angular.copy(storeModel['notations'])
        return this;
    }
}

function sm_Measure(sm) {
    this.number = sm['-number'];
    this.width = sm['-width'];
    this.attributes = angular.copy(sm['attributes'] || {});
    //    console.log(`==>Measure ${this.number} ${JSON.stringify(sm)}`);
    this.note = (new sm_Note()).parseStoreModels(sm['note']);
    
    console.log(typeof sm['print'])
    if (sm['print']){
        this.marignLeft = sm['print']['system-layout']['system-margins']['left-margin'];
    }else {
        this.marginLeft = 0;
    }
}

sm_Measure.prototype = {
    constructor: sm_Measure
}

function sm_Part() {
    this._id = -1;
    this.measure = [];
}

sm_Part.prototype = {
    constructor: sm_Part
    , fromStoreModel: function (sm) {
        this._id = parseInt(sm['-id']);
        this.measure = _.map(sm['measure'], function (model) {
            return new sm_Measure(model)
        });
    }
}

var sum = function (list, start, end) {
    start = start || 0;
    end = end || list.length;
    var result = 0.0;
    for (var i = start; i < end; i += 1) {
        result += list[i];
    }
    return result;
}

function vm_Measure(sm) {

}

function vm(part) {
    var WIDTH = 1190;

    var lines = [];
    var line = [];

    var widths = _.map(_.pluck(part.measure, 'width'), (w) => parseFloat(w));
    var pw = 0.0;
    for (var idx = 0; idx < part.measure.length; idx++) {
        if (pw + widths[idx] > WIDTH) {
            lines.push({
                measures: line
            });
            line = [];
            pw = 0.0;
        }
        pw += widths[idx]
        line.push(part.measure[idx]);
    }
    if (line.length != 0) {
        lines.push({
            measures: line
        });
    }

    this.lines = lines;

    for (var i = 0; i < part.measure.length; i++) {
        part.measure[i].previous = part.measure[i - 1];
        part.measure[i].next = part.measure[i + 1];
        part.measure[i].parent = this;

        var m = part.measure[i];

        var prev = undefined;

        //        if ( m.note._name == 'sm_Note' && typeof m.note.pitch != 'undefined' ){
        //            m.note.parent = m;
        //            if (prev != undefined ){
        //                
        //            }
        //        }


    }
}

function toView(part) {
    var smpart = new sm_Part();
    smpart.fromStoreModel(part);
    var vp = new vm(smpart);
    return vp;
}

angular.module('score', [])
    .controller('pageController', ['$scope', function ($scope) {

        var storeData = data["score-partwise"].part[0];

        $scope.part = toView(storeData);

        //        $scope.measures = toView(storeData).measure;

        console.log($scope.part)

}])