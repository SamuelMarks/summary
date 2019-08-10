"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_types = Object.freeze([
    Array, Int8Array, Uint8Array, Int16Array, Uint16Array,
    Int32Array, Uint32Array, Float32Array, Float64Array
]);
class Summary {
    constructor(_data, sorted) {
        this._data = _data;
        this._cache_quartiles = {};
        this.init(_data, sorted);
    }
    static _(_data, sorted) {
        return new Summary(_data, sorted);
    }
    init(_data, sorted) {
        if (array_types.indexOf(_data.constructor) === -1) {
            throw TypeError('data must be an array');
        }
        else if (!_data.length) {
            throw TypeError('data must exceed length of 0');
        }
        this._sorted = sorted ? _data : undefined;
        this._length = _data.length;
        this._cache_sum = undefined;
        this._cache_mode = undefined;
        this._cache_mean = undefined;
        this._cache_quartiles = {};
        this._cache_constiance = undefined;
        this._cache_sd = undefined;
        this._cache_max = undefined;
        this._cache_min = undefined;
        this._cache_variance = undefined;
    }
    data() {
        return this._data;
    }
    sort() {
        if (this._sorted == null) {
            this._sorted = this._data.slice(0).sort(function (a, b) { return a - b; });
        }
        return this._sorted;
    }
    size() {
        return this._length;
    }
    sum() {
        if (this._cache_sum == null) {
            let sum = 0;
            for (let i = 0; i < this._length; i++)
                sum += this._data[i];
            this._cache_sum = sum;
        }
        return this._cache_sum;
    }
    mode() {
        if (this._cache_mode == null) {
            const data = this.sort();
            let modeValue = NaN;
            let modeCount = 0;
            let currValue = data[0];
            let currCount = 1;
            for (let i = 1; i < this._length; i++) {
                if (data[i] === currValue) {
                    currCount += 1;
                }
                else {
                    if (currCount >= modeCount) {
                        modeCount = currCount;
                        modeValue = currValue;
                    }
                    currValue = data[i];
                    currCount = 1;
                }
            }
            if (currCount >= modeCount) {
                modeCount = currCount;
                modeValue = currValue;
            }
            this._cache_mode = modeValue;
        }
        return this._cache_mode;
    }
    mean() {
        if (this._cache_mean == null) {
            this._cache_mean = this.sum() / this._length;
        }
        return this._cache_mean;
    }
    quartile(prob) {
        if (!this._cache_quartiles.hasOwnProperty(prob)) {
            const data = this.sort();
            const product = prob * this.size();
            const ceil = Math.ceil(product);
            if (ceil === product) {
                if (ceil === 0) {
                    this._cache_quartiles[prob] = data[0];
                }
                else if (ceil === data.length) {
                    this._cache_quartiles[prob] = data[data.length - 1];
                }
                else {
                    this._cache_quartiles[prob] = (data[ceil - 1] + data[ceil]) / 2;
                }
            }
            else {
                this._cache_quartiles[prob] = data[ceil - 1];
            }
        }
        return this._cache_quartiles[prob];
    }
    median() {
        return this.quartile(0.5);
    }
    constiance() {
        if (this._cache_constiance == null) {
            const mean = this.mean();
            let sqsum = 0;
            for (let i = 0; i < this._length; i++) {
                sqsum += (this._data[i] - mean) * (this._data[i] - mean);
            }
            this._cache_constiance = sqsum / (this._length - 1);
        }
        return this._cache_constiance;
    }
    sd() {
        if (this._cache_sd == null) {
            this._cache_sd = Math.sqrt(this.constiance());
        }
        return this._cache_sd;
    }
    max() {
        if (this._cache_max == null) {
            this._cache_max = this.sort()[this._length - 1];
        }
        return this._cache_max;
    }
    min() {
        if (this._cache_min == null) {
            this._cache_min = this.sort()[0];
        }
        return this._cache_min;
    }
    variance() {
        if (this._cache_variance == null) {
            const mean = this.mean();
            let sqsum = 0;
            for (let i = 0; i < this._length; i++) {
                sqsum += (this._data[i] - mean) * (this._data[i] - mean);
            }
            this._cache_variance = sqsum / (this._length - 1);
        }
        return this._cache_variance;
    }
}
exports.Summary = Summary;
exports.summary = function (_data, sorted) {
    if (!(this instanceof Summary)) {
        return new Summary(_data, sorted);
    }
    else {
        this.init(_data, sorted);
    }
};
