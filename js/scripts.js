const currentDate = document.querySelector(".current-date") //Data atual
let daysTag = document.querySelector(".days")
let prevNextIcon = document.querySelectorAll(".icons span")
//Variáveis Data, Ano e Mês
let date = new Date()
let currYear = date.getFullYear()
let currMonth = date.getMonth()

console.log(date, currYear, currMonth);
//Meses do Ano
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
//Mês selecionado na tela
const renderCalendar = () => {
  //Primeira data do mês
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay()
  //Última data do mês
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate()
  //Primeiras datas do mês seguinte
  let firstDateofNextMonth = new Date(currYear, currMonth, lastDateofMonth).getDay()
  //Últimas datas do mês anterior
  let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate()
  //Inserção do texto na 'li'
  let liTag = "";

  //Impressão na tela
  for (let i = firstDayofMonth; i > 0; i--){//Últimos dias do mês anterior
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++){//Dias do mês atual
    //Se for o dia atual, imprimir na tela a data com a classe "active"
    let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : ""
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = firstDateofNextMonth; i < 6; i++){//Primeiros dias do próximo mês
    liTag += `<li class="inactive">${i - firstDateofNextMonth + 1}</li>`;
  }

  //Impressões na tela do mês, ano e suas datas
  currentDate.innerText = `${months[currMonth]} ${currYear}`
  daysTag.innerHTML = liTag

}
renderCalendar()

prevNextIcon.forEach(icon => {
  icon.addEventListener("click", () => {
    //Se clicar no botão de "voltar", mês receberá menos um. Caso contrário, mês receberá mais um
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1

    console.log(currMonth);

    //Lógica para alterar o ano e resetar o mês
    if(currMonth > 11) {
      currYear += 1
      currMonth = 0 
    } else if (currMonth < 0) {
      currMonth = 11
      currYear -= 1
    }
    renderCalendar()
  })
})