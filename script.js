class FirePumpTest {
  constructor() {
    this.startButton = document.querySelector(".hero__start-button")
    this.testBlock = document.querySelector(".test")
    this.heroContent = document.querySelector(".hero__content")
    this.points = [...document.querySelectorAll(".test__point")]
    this.finishButton = document.querySelector(".test__finish")
    this.progress = document.querySelector(".test__progress-value")

    this.resultBlock = document.querySelector(".result")
    this.scoreElement = document.querySelector(".result__score")
    this.listElement = document.querySelector(".result__list")
    this.restartButton = document.querySelector(".result__restart")

    this.correct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    this.user = []

    this.init()
  }

  init() {
    this.startButton.addEventListener("click", () => this.start())
    this.finishButton.addEventListener("click", () => this.finish())
    this.restartButton.addEventListener("click", () => location.reload())

    this.points.forEach((point) => {
      point.addEventListener("click", (e) => this.select(e))
    })
  }

  start() {
    this.heroContent.style.display = "none"
    this.testBlock.style.display = "block"
  }

  select(e) {
    const point = e.target
    const id = Number(point.dataset.id)

    if (this.user.includes(id)) return
    if (this.user.length >= 10) return

    this.user.push(id)

    point.classList.add("test__point--selected")
    point.textContent = String(this.user.length)
    point.setAttribute("aria-label", `Точка ${id}, шаг ${this.user.length}`)

    this.progress.textContent = this.user.length + " / 10"
  }

  finish() {
    let score = 0
    this.listElement.innerHTML = ""

    this.correct.forEach((value, index) => {
      const li = document.createElement("li")

      if (this.user[index] === value) {
        score++
        li.textContent = "Шаг " + (index + 1) + " — правильно"
        li.className = "result__correct"
      } else {
        li.textContent = "Шаг " + (index + 1) + " — ошибка"
        li.className = "result__wrong"
      }

      this.listElement.appendChild(li)
    })

    this.scoreElement.textContent = "Результат: " + score + " / 10"

    this.testBlock.style.display = "none"
    this.resultBlock.style.display = "flex"
  }
}

new FirePumpTest()
