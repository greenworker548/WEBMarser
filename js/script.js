const data = {
    moneyValue: 1000,
    resorcesValue: 1000,
    experienceValue: 1000,
}

const dataDrillValue = {
    fuelValue: 20,
    oilValue: 5,
}

const dataHouseValue = {
    waterValue: 0,
    foodValue: 0,
    storageValue: 0,
}

// Узлы со значениями основной панели
const moneyValue = document.querySelector(".money__value")
const resorcesValue = document.querySelector(".resorces__value")
const experienceValue = document.querySelector(".experience__value")

// Бур
// Узлы со значениями панели буровой
const fuelValue = document.querySelector(".fuel__value")
const oilValue = document.querySelector(".oil__value")

// Узлы кнопок поплнения ресурсов буровой
const fuelFill = document.querySelector(".fuel__fill")
const oilFill = document.querySelector(".oil__fill")

// Узел кнопки запуска буровой
const drillRun = document.querySelector(".drill__run")

// Дом
// Узлы со значениями панелей дома
const waterValue = document.querySelector(".water__value")
const foodValue = document.querySelector(".food__value")
const storageValue = document.querySelector(".storage__value")



// Рендеры
// Функция рендера значений основной панели
function renderValueMainPanel(data) {
    moneyValue.textContent = data.moneyValue
    resorcesValue.textContent = data.resorcesValue
    experienceValue.textContent = data.experienceValue
}

// Функция рендера значений панели буровой
function renderValueDrillPanel() {
    fuelValue.textContent = dataDrillValue.fuelValue
    oilValue.textContent = dataDrillValue.oilValue
}

// Функция рендера значений панелей дома
function renderValueHousePanels(dataHouseValue) {
    waterValue.textContent = dataHouseValue.waterValue
    foodValue.textContent = dataHouseValue.foodValue
    storageValue.textContent = dataHouseValue.storageValue
}

// Функция рендера всех значений
function renderAllValue(data, dataDrillValue, dataHouseValue) {
    renderValueMainPanel(data)
    renderValueDrillPanel(dataDrillValue)
    renderValueHousePanels(dataHouseValue)
}

// Функция пополнения топлива буровой
function fellFuelValueDrill(data, dataDrillValue) {
    const value = dataDrillValue.fuelValue
    const difference = 200 - value

    dataDrillValue.fuelValue = 200

    fuelValue.textContent = dataDrillValue.fuelValue

    data.resorcesValue -= difference 

    renderValueMainPanel(data)
}

// Функция пополнения масла буровой
function fellOilValueDrill(data, dataDrillValue) {
    const value = dataDrillValue.oilValue
    const difference = 50 - value

    dataDrillValue.oilValue = 50

    oilValue.textContent = dataDrillValue.oilValue

    data.resorcesValue -= difference 

    renderValueMainPanel(data)
}

// Функция расходования топлива
function consumptionFuel(dataDrillValue) {
    const intervalConsumptionFuel = setInterval(() => {
        dataDrillValue.fuelValue -= 1

        getOre(dataHouseValue)

        renderValueDrillPanel(dataDrillValue)

        if (dataDrillValue.fuelValue == 0) {
            clearInterval(intervalConsumptionFuel)
            console.log("Закончилось топливо!")
        }
    },1000)
}

// Функция расходования масла
function consumptionOil(dataDrillValue) {
    const intervalConsumptionOil = setInterval(() => {
        dataDrillValue.oilValue -= 1

        renderValueDrillPanel(dataDrillValue)

        if (dataDrillValue.oilValue == 0) {
            clearInterval(intervalConsumptionOil)
            console.log("Закончилось масло!")
        }
    },5000)
}

// Общая функция расхода каких-либо ресурсов
function consumption(store, property, value, render) {
    store[property] -= value
    render()
}

// Функция работы буровой
function runDrill() {
    const intervalConsumptionFuel = setInterval(() => {
        consumption(dataDrillValue, "fuelValue", 1, () => renderValueDrillPanel())

        if (dataDrillValue.fuelValue == 0) {
            clearInterval(intervalConsumptionFuel)
            console.log("Закончилось топливо!")
        }
    },1000)
    const intervalConsumptionOil = setInterval(() => {
        consumption(dataDrillValue, "oilValue", 1, () => renderValueDrillPanel())

        if (dataDrillValue.oilValue == 0) {
            clearInterval(intervalConsumptionOil)
            console.log("Закончилось масло!")
        }
    },5000)
}



// Функция попадания руды в хранилище
function getOre(dataHouseValue) {
    dataHouseValue.storageValue += 1

    renderValueHousePanels(dataHouseValue)
}


// Обработчики пополнения ресурсов буровой
fuelFill.addEventListener("click", () => fellFuelValueDrill(data, dataDrillValue))
oilFill.addEventListener("click", () => fellOilValueDrill(data, dataDrillValue))

// Обработчик первого рендера
document.addEventListener("DOMContentLoaded", () => renderAllValue(data, dataDrillValue, dataHouseValue))

// Обработчик запуска буровой
drillRun.addEventListener("click", () => runDrill(dataDrillValue, dataHouseValue))