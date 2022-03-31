var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const NO_OF_CHARTS = 100;
const data = {
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    datasets: [
        {
            label: 'SomeValues',
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.2,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};
const charts = [];
function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
function createChart(ctx) {
    const chart = new Chart(ctx, {
        type: 'line',
        data: data
    });
    charts.push(chart);
}
function getContextForCanvas(canvasId) {
    const canvas = $(`#${canvasId}`)[0];
    return canvas.getContext('2d');
}
function injectCanvas(id, div) {
    return __awaiter(this, void 0, void 0, function* () {
        function getPaddedId(i) {
            return i < 10 ? `0${i}` : i.toString();
        }
        const paddedId = getPaddedId(id);
        const idStr = `canvas${paddedId}`;
        const html = `<div class="canvas-container">
                    <span class="label">Chart #${getPaddedId(id + 1)}</span>
                    <canvas id="${idStr}"></canvas>
                  </div>`;
        div.append(html);
        yield wait(25);
        return getContextForCanvas(idStr);
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const container = $('#container');
        for (let i = 0; i < NO_OF_CHARTS; i++) {
            const context = yield injectCanvas(i, container);
            createChart(context);
        }
    });
}
$(() => __awaiter(this, void 0, void 0, function* () { return yield init(); }));
//# sourceMappingURL=charts.js.map