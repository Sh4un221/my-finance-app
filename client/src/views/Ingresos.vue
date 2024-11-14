<template>
  <div class="income-list-container">
    <h2>Ingresos</h2>
    <div class="income-list">
      <div class="income-item" v-for="(income, index) in incomeList" :key="index">
        <div class="income-info">
          <input v-if="income.isEditing" v-model="income.name" class="income-name-input" />
          <span v-else class="income-name">{{ income.name }}</span>
          <input v-if="income.isEditing" v-model="income.amount" class="income-amount-input" type="number" />
          <span v-else class="income-amount">{{ income.amount.toFixed(2) }}</span>
        </div>
        <div class="income-progress">
          <div class="progress-bar" :style="{ width: getPercentage(income.amount) }"></div>
          <span class="progress-percentage">{{ getPercentage(income.amount) }}</span>
        </div>
        <div class="income-actions">
          <v-btn v-if="!income.isEditing" @click="editIncome(index)" icon><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn v-else @click="saveIncome(index)" icon><v-icon>mdi-check</v-icon></v-btn>
          <v-btn @click="deleteIncome(index)" icon><v-icon>mdi-delete</v-icon></v-btn>
        </div>
      </div>
    </div>
    <div class="add-income">
      <v-text-field v-model="newIncomeName" label="Nuevo Ingreso" />
      <v-text-field v-model="newIncomeAmount" label="Monto" type="number" />
      <v-btn @click="addIncome" color="primary">Agregar</v-btn>
    </div>
    <div class="total">
      <v-text class="total-text">
        Total: {{ incomeList.reduce((sum, income) => sum + Number(income.amount), 0).toFixed(2) }}
      </v-text>
    </div>
    
  </div>
  
</template>

<script>
export default {
  name: 'IncomeList',
  data() {
    return {
      incomeList: [],
      newIncomeName: '',
      newIncomeAmount: 0
    }
  },
  created() {
    this.loadIncomeFromStorage();
  },
  methods: {
    loadIncomeFromStorage() {
      const storedIncome = localStorage.getItem('incomeList');
      if (storedIncome) {
        this.incomeList = JSON.parse(storedIncome).map(income => ({
          ...income,
          amount: Number(income.amount)
        }));
      }
    },
    saveIncomeToStorage() {
      localStorage.setItem('incomeList', JSON.stringify(this.incomeList));
    },
    addIncome() {
      if (this.newIncomeName && this.newIncomeAmount > 0) {
        this.incomeList.push({
          name: this.newIncomeName,
          amount: Number(this.newIncomeAmount),
          isEditing: false
        });
        this.newIncomeName = '';
        this.newIncomeAmount = 0;
        this.saveIncomeToStorage();
      }
    },
    editIncome(index) {
      this.incomeList[index].isEditing = true;
    },
    saveIncome(index) {
      this.incomeList[index].isEditing = false;
      this.saveIncomeToStorage();
    },
    deleteIncome(index) {
      this.incomeList.splice(index, 1);
      this.saveIncomeToStorage();
    },
    getPercentage(amount) {
      const totalIncome = this.incomeList.reduce((sum, income) => sum + Number(income.amount), 0);
      return `${(Number(amount) / totalIncome * 100).toFixed(2)}%`;
    }
  }
}
</script>

<style scoped>
.income-list-container {
  display: flex;
  width: 100%;
  height: auto;
  max-height: 100vh;
  flex-direction: column;
}
.income-list {
  max-height: 300px;
  overflow-y: auto;
}
.income-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
.income-info {
  display: flex;
  justify-content: space-between;
  width: 40%;
}
.income-name{
  max-width: 45%;
  overflow: auto;
}
.income-name, .income-amount {
  font-weight: bold;
}
.income-name-input, .income-amount-input {
  width: 100px;
  padding: 4px;
}
.income-progress {
  display: flex;
  align-items: center;
  width: 30%;
}
.progress-bar {
  flex-grow: 1;
  height: 20px;
  background-color: #4CAF50;
}
.progress-percentage {
  margin-left: 8px;
}
.income-actions {
  width: 20%;
  display: flex;
  justify-content: flex-end;
}
.add-income {
  display: flex;
  margin-top: 16px;
  gap: 50px;
}
.total-text{
  font-weight: 700;
  font-size: 25px;
  color: #4CAF50;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

</style>