<template>
    <div class="plot">
        Эйлер:<br>
        <div ref="plotRefEuler"></div>
    </div>
    <div class="plot">
        Рунге-Кутта:<br>
        <div ref="plotRefRungeKutta"></div>
    </div>
    <div class="plot">
        Адамс:<br>
        <div ref="plotRefAdams"></div>
    </div>
</template>

<script>
import functionPlot from "function-plot";

export default {
    props: {
        eulerProp: {
            type: Array,
        },
        rungeKuttaProp: {
            type: Array,
        },
        adamsProp: {
            type: Array,
        },
        exactSolutionProp: {
            type: Array,
        },
        leftProp: {
            type: Number,
        },
        rightProp: {
            type: Number,
        },
        bottomProp: {
            type: Number,
        },
        topProp: {
            type: Number,
        },
    },
    watch: {
        eulerProp: function () {
            console.log(this.bottomProp)
            console.log(this.topProp)
            this.updatePlot(this.eulerProp, this.rungeKuttaProp, this.adamsProp, this.exactSolutionProp, this.leftProp, this.rightProp, this.bottomProp, this.topProp)
        },
    },
    methods: {
        updatePlot(euler, rungeKutta, adams, exactSolution, left, right, bottom, top) {
            let a = functionPlot({
                target: this.$refs.plotRefEuler,
                width: 350,
                height: 350,
                grid: true,
                // disableZoom: true,
                xAxis: {domain: [left, right]},
                yAxis: { domain: [bottom, top] },
                data: [
                    {
                        points: exactSolution,
                        fnType: 'points',
                        graphType: 'scatter',
                        color: 'red'
                    },
                    {
                        points: euler,
                        fnType: 'points',
                        graphType: 'scatter',
                        color: 'green'
                    }
                ]

            });
            let b = functionPlot({
                target: this.$refs.plotRefRungeKutta,
                width: 350,
                height: 350,
                grid: true,
                // disableZoom: true,
                xAxis: {domain: [left, right]},
                yAxis: { domain: [bottom, top] },
                data: [
                    {
                        points: exactSolution,
                        fnType: 'points',
                        graphType: 'scatter',
                        color: 'red'
                    },
                    {
                        points: rungeKutta,
                        fnType: 'points',
                        graphType: 'scatter',
                        color: 'green'
                    }
                ]
            });
            let c = functionPlot({
                target: this.$refs.plotRefAdams,
                width: 350,
                height: 350,
                grid: true,
                // disableZoom: true,
                xAxis: {domain: [left, right]},
                yAxis: { domain: [bottom, top] },
                data: [
                    {
                        points: exactSolution,
                        fnType: 'points',
                        graphType: 'scatter',
                        color: 'red'
                    },
                    {
                        points: adams,
                        fnType: 'points',
                        graphType: 'scatter',
                        color: 'green'
                    }
                ]
            });
            a.addLink(b, c)
            b.addLink(a, c)
            c.addLink(a, b)
        }
    }
}

</script>

<style scoped>
.plots {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.plot {
    width: 350px;
}

</style>