<template>
    <v-container>
        <h2>Monitor de Criptomonedas</h2>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>Gráfico en Tiempo Real</v-card-title>
                    <v-card-text>
                        <iframe src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_65b6a&symbol=BINANCE%3ABTCUSDT&interval=1D&theme=light"
                                width="100%" height="600" frameborder="0" allowtransparency="true"></iframe>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'CriptoMonitor'
}
</script>
