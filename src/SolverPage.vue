<template>
    <div class="app column">
        <div class="header">
            <h2>Решение ОДУ</h2>
        </div>
        <div class="main column">
            <div class="row">
                <div class="forms appElement column">
                    <div v-if="errors.length > 0" class="column appElement">
                        <div v-for="message in errors">
                            {{message}}<br><br>
                        </div>
                    </div>
                    <div v-else>

                    </div>
                    <approximation-form class="form"
                                        @solve="solve"
                                        @error="error"
                    />
                </div>
                <div class="plots appElement column">
                    <plot :eulerProp="euler" :rungeKuttaProp="rungeKutta" :adamsProp="adams" :exactSolutionProp="exactSolution" :leftProp="left" :rightProp="right" :bottomProp="bottom" :topProp="top"/>
                </div>
            </div>
            <div class="row">

                <div class="result appElement column">
                    Точное решение:
                    <div v-for="point, index in exactSolution" class="row">
                        x:
                        <div style="margin: 10px">
                            <pre>{{point[0]}}</pre>
                        </div>
                        y:
                        <div style="margin: 10px">
                            <pre>{{point[1]}}</pre>
                        </div>
                        <br>
                    </div>
                </div>
                <div class="result appElement column">
                    Решение методом Эйлера:
                    <div v-for="point, index in euler" class="row">
                        x:
                        <div style="margin: 10px">
                            <pre>{{point[0]}}</pre>
                        </div>
                        y:
                        <div style="margin: 10px">
                            <pre>{{point[1]}}</pre>
                        </div>
                        <br>
                    </div>
                </div>
                <div class="result appElement column">
                    Решение методом Рунге-Кутта:
                    <div v-for="point, index in rungeKutta" class="row">
                        x:
                        <div style="margin: 10px">
                            <pre>{{point[0]}}</pre>
                        </div>
                        y:
                        <div style="margin: 10px">
                            <pre>{{point[1]}}</pre>
                        </div>
                        <br>
                    </div>
                </div>
                <div class="result appElement column">
                    Решение методом Адамса:  eps: {{eps}}
                    <div v-for="point, index in adams" class="row">
                        x:
                        <div style="margin: 10px">
                            <pre>{{point[0]}}</pre>
                        </div>
                        y:
                        <div style="margin: 10px">
                            <pre>{{point[1]}}</pre>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApproximationForm from "@/components/SolverForm.vue";
import Plot from "@/components/Plot.vue";
import index from "vuex";

export default {
    computed: {
        index() {
            return index
        }
    },
    components: {
        Plot,
        ApproximationForm
    },
    name: "App",
    data() {
        return {
            left: -5,
            right: 5,
            bottom: -5,
            top: 5,
            eps: '',
            euler: [],
            rungeKutta: [],
            adams: [],
            errors: [],
            exactSolution: [],
        };
    },
    methods: {
        solve(data, left, right, h) {
            console.log(data)
            this.left = left - h
            this.right = right + h
            this.euler = data.euler
            this.rungeKutta = data.rungeKutta
            this.adams = data.adams
            this.exactSolution = data.exactSolution
            this.bottom = data.min - h
            this.top = data.max + h
            this.errors = data.errors
            this.eps = data.maxDifference
            // let maxLength = 0
            // for (let i = 0; i < this.finiteDifferences.length; i++) {
            //     for (let j = 0; j < this.finiteDifferences[i].length; j++) {
            //         this.finiteDifferences[i][j] = this.finiteDifferences[i][j].toFixed(4)
            //         if (this.finiteDifferences[i][j].length > maxLength) {
            //             maxLength = this.finiteDifferences[i][j].length
            //         }
            //     }
            // }
            // console.log(maxLength)
            // this.table[0] = 'x  '
            // for (let i = 0; i < this.finiteDifferences.length; i++) {
            //     if (i !== 0 && i < 10) {
            //         this.table[i] = 'y' + i + ' '
            //     } else if (i !== 0) {
            //         this.table[i] = 'y' + i
            //     }
            //
            //     for (let j = 0; j < this.finiteDifferences[i].length; j++) {
            //         while (this.finiteDifferences[i][j].length < maxLength) {
            //             this.finiteDifferences[i][j] = " " + this.finiteDifferences[i][j]
            //         }
            //     }
            // }
        },
        reset() {
            this.left = -5
            this.right = 5
            this.eulerX = []
            this.eulerY = []
            this.rungeKuttaX = []
            this.rungeKuttaY = []
            this.adamsX = []
            this.adamsY = []
            this.errors = []
        },
        error(errors) {
            this.errors = errors;
            console.log(errors)
        },
    },
};
</script>


<style scoped>
*:global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border-radius: 7px;
    background-color: #d7d4c9;
    font-family: "Courier New";
    font-weight: bolder;
    color: black;
}

.app {
    width: 100%;
    padding: var(--padding-size);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    --text-size: 15px;
    --text-size-header: 40px;
    --padding-size: 5px;
    --button-size: 110px;
    --button-padding-size: 5px;
    --element-form-text-size: 15px;
}

.main {
    font-size: var(--text-size);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 20px;
    padding: 20px;
}

.header {
    width: 100%;
    text-align: center;
    font-size: var(--text-size-header);
    margin: 50px 0px 20px 0px;
}

.result {
    width: 1160px;
    display: flex;
    flex-direction: row;
}

.appElement {
    //height: 650px;
    margin: 20px;
    padding: 20px;
    border: 1.5px solid black;
}

.forms {
    width: 600px;
    //justify-content: space-evenly;
    --button-size: 130px;
    --button-padding-size: 10px;
    --element-form-text-size: 15px;
}
.row {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
.column {
    display: flex;
    flex-direction: column;
}
.plots {
    width: 400px;
}
plot {
    width: 100%;
}
</style>

