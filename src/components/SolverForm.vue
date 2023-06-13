<template>
    <form @submit.prevent>
        <div class="inputs">
<!--            <div class="element">-->
<!--                Файл:-->
<!--                <my-input type="file" @change="changeFile"/>-->
<!--            </div>-->
            <div class="element">
                Уравнение:
                <my-select v-model="equation" :options="equationOptions"/>
            </div>
            <div class="element">
                <br>
                Интервал дифференцирования:
                <div class="row">
                    <div class="interval">
                        x₀:
                        <my-input v-model='x0' type="number"/>
                    </div>
                    <div class="interval">
                        xₙ:
                        <my-input v-model='xn' type="number"/>
                    </div>
                </div>
            </div>
            <div class="element">
                <br>
                Начальное условие y₀ = y({{x0}}):
                <my-input v-model='y0' type="number"/>
            </div>
            <div class="element">
                h:
                <my-input v-model="h" type="number"/>
            </div>
            <div class="element">
                ε:
                <my-input v-model="eps" type="number"/>
            </div>
        </div>
        <div class="commandButton">
            <my-button type="button" @click="reset">Сбросить</my-button>
            <my-button type="button" @click="solve">Отправить</my-button>
        </div>
    </form>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MySelect from "@/components/UI/MySelect.vue";
import axios from "axios";

export default {
    components: {MySelect, MyInput, MyButton},
    data() {
        return {
            equation: 1,
            equationOptions: [
                {value: 1, name: "y' = y + x"},
                {value: 2, name: "y' = 2sin(x)y"},
                {value: 3, name: "y' = 5x⁴y"}
            ],
            x0: '',
            xn: '',
            y0: '',
            h: '',
            eps: '',
        };
    },
    methods: {
        solve() {
            let errors = []
            if((this.xn - this.x0) / this.h + 1 < 9) {
                errors.push("Проверьте, что при заданных границах интревала и текущем h, получится хотя бы 10 точек")
            }
            if((this.xn - this.x0) / this.h> 1000) {
                errors.push("Проверьте, что при заданных границах интревала и текущем h, получится не более 1000 точек")
            }
            if (Number.parseFloat(this.x0) >= Number.parseFloat(this.xn)){
                errors.push("Проверьте, что границы интервала корректны")
            }
            if (this.h <= 0){
                errors.push("Проверьте, что шаг корректен (число больше 0)")
            }
            if (this.eps <= 0){
                errors.push("Проверьте, что точность корректна (число больше 0)")
            }
            if(errors.length > 0) {
                this.$emit("error", errors);
                return;
            }
            axios
                .post(
                    "http://localhost:8081/api/solve",
                    {
                        equation: this.equation,
                        x0: this.x0,
                        xn: this.xn,
                        y0: this.y0,
                        h: this.h,
                        eps: this.eps,
                    },
                ).then((res) => {
                this.$emit("solve", res.data, Number.parseFloat(this.x0), Number.parseFloat(this.xn), Number.parseFloat(this.h));
            }).catch((error) => {
                this.$emit("error", error.response.data);
            });
        },

        // updateValues(numberOfPoints, points) {
        //     this.numberOfPoints = numberOfPoints;
        //     this.point1 = points[0]
        //     this.point2 = points[1]
        //     this.point3 = points[2]
        //     this.point4 = points[3]
        //     this.point5 = points[4]
        //     this.point6 = points[5]
        //     this.point7 = points[6]
        //     this.point8 = points[7]
        //     if (this.numberOfPoints > 8) {
        //         this.point9 = points[8]
        //     }
        //     if (this.numberOfPoints > 9) {
        //         this.point10 = points[9]
        //     }
        //     if (this.numberOfPoints > 10) {
        //         this.point11 = points[10]
        //     }
        //     if (this.numberOfPoints > 11) {
        //         this.point12 = points[11]
        //     }
        // },
        // changeFile(event) {
        //     if (event.target.files[0].type === "text/plain") {
        //         let reader = new FileReader();
        //         reader.readAsText(event.target.files[0], 'windows-1251')
        //         let results;
        //         reader.onload = () => {
        //             results = reader.result.split("\r\n");
        //             if (results.length < 9 || results.length > 13) {
        //                 let errors = ["Неверное количество строк в файле(ожидается от 10 до 14 строк)."]
        //                 this.$emit("error", errors);
        //             } else {
        //                 if (!isNaN(parseFloat(results[0]))) {
        //                     let numberOfPoints = parseFloat(results[0])
        //                     if (results.length !== numberOfPoints + 1) {
        //                         let errors = ["Неверное количество строк в файле."]
        //                         this.$emit("error", errors);
        //                     } else {
        //                         let points = []
        //                         for (let i = 1; i < numberOfPoints + 1; i++) {
        //                             results[i] = results[i].trim()
        //                             results[i] = results[i].replaceAll(',', '.')
        //                             let pointString = results[i].split(" ")
        //                             if (pointString.length === 2) {
        //                                 if (!isNaN(parseFloat(pointString[0])) &&
        //                                     !isNaN(parseFloat(pointString[1]))) {
        //                                     let point = [pointString[0],
        //                                         pointString[1]]
        //                                     points.push(point);
        //                                 } else {
        //                                     console.log(pointString[0])
        //                                     console.log(pointString[1])
        //                                     let errors = ["Значения точек должны быть числами"]
        //                                     this.$emit("error", errors);
        //                                 }
        //                             } else {
        //                                 let errors = ["В строках с точками ожидается 2 числа"]
        //                                 this.$emit("error", errors);
        //                             }
        //                         }
        //                         this.updateValues(numberOfPoints, points);
        //                     }
        //                 } else {
        //                     let errors = ["Значение 'Количество точек' должно быть числом"]
        //                     this.$emit("error", errors);
        //                 }
        //             }
        //         };
        //         reader.onerror = function () {
        //             this.$emit("error", "Произошла ошибка чтения из файла");
        //         };
        //     } else {
        //         this.$emit("error", "Произошла ошибка чтения из файла");
        //     }
        // },
        reset() {
            this.equation = 1
            this.x0 = ''
            this.xn = ''
            this.y0 = ''
            this.h = ''
            this.eps = ''
            this.$emit("reset");
        },
    },
};
</script>

<style scoped>

.commandButton {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
.element {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 10px;
}
.interval {
    width: 48%;
}
.point div{
    width: 49%;
}
.row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.interval input {
    background-color: #828670;
}

</style>
