# javascript-timelinechart
Timeline Chart é uma biblioteca em javascript que mostra de forma dinâmica e ilustrativa um conjunto de atividades e seus respectivos períodos de execução exibindo em **horas**, **dias** ou **meses**.

## Especificações da biblioteca

#### Compatibilidade
Gráfico testado nos seguintes navegadores:
+ Chrome
+ Firefox
+ Explorer 9 ou superior

#### Modo de visualização
+ **`month`:** exibe processos em meses.
+ **`day`:** exibe processos em dias.
+ **`hour`:** exibe processos em horas no intervalo de 60 minutos.

#### Métodos
**customChart(chartMode, start, end) { return options }:** método responsável por retornar objeto de configuração do gráfico:
+ **`chartMode`:** modo de exibição do gráfico variando entre `month`, `day` ou `hour`.
+ **`start`:** período mínimo de execução.
+ **`end`:** período máximo de execução.

**addRow(id, value, start, end, background) { return data }:** método responsável por retornar o objeto de dados do gráfico:
+ **`id`:** código da atividade, se o id se repetir a atividade é exibido na mesma linha.
+ **`value`:** descrição da atividade.
+ **`start`:** período de iniciação da atividade.
+ **`end`:** período de encerramento da atividade.
+ **`background`:** configuração da cor da atividade, caso não seja informado é utilizado a formatação automática da biblioteca.

**drawChart(dataTable, options) { }:** método responsável por desenhar o gráfico:
+ **`dataTable`:** conjunto de dados a serem exebidos no gráfico.
+ **`options`:** opções de configuração do gráfico.

#### Exemplo
var options = customChart(`month`, `new Date(2015,0,01,0,0,0)`, `new Date(2016,11,31,0,0,0)`, `Gráfico Mensal`);

var data    = [addRow(`"1"`, `"activity 1"`, `new Date(2015,00,01,0,0,0)`, `new Date(2015,02,20,23,59,59)`, `""`)
              ,addRow(`"2"`, `"activity 2"`, `new Date(2015,01,01,0,0,0)`, `new Date(2015,07,10,23,59,59)`, `""`)];
              
drawChart(`data`, `options`);
