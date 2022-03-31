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
const charts: Chart[] = [];

function wait(milliseconds: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function createChart(ctx: CanvasRenderingContext2D): void {
    const chart = new Chart(ctx, {
        type: 'line',
        data: data
    });
    charts.push(chart);
}

function getContextForCanvas(canvasId: string): CanvasRenderingContext2D {
    const canvas = <HTMLCanvasElement>$(`#${canvasId}`)[0];
    return canvas.getContext('2d');
}

async function injectCanvas(id: number, div: JQuery): Promise<CanvasRenderingContext2D> {

    function getPaddedId(i: number): string {
        return i < 10 ? `0${i}` : i.toString();
    }

    const paddedId = getPaddedId(id);
    const idStr = `canvas${paddedId}`;
    const html = `<div class="canvas-container">
                    <span class="label">Chart #${getPaddedId(id+1)}</span>
                    <canvas id="${idStr}"></canvas>
                  </div>`;
    div.append(html);
    await wait(25);
    return getContextForCanvas(idStr);
}

async function init(): Promise<void> {
    const container = $('#container');

    for (let i = 0; i < NO_OF_CHARTS; i++){
        const context = await injectCanvas(i, container);
        createChart(context);
    }
}

$(async () => await init());
