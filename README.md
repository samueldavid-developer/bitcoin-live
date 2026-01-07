Bitcoin Live Dashboard
Esta es una terminal de monitoreo de Bitcoin diseñada para ofrecer una visualización limpia y técnica de los movimientos del mercado en tiempo real. El proyecto nace de la necesidad de tener un tablero de control que priorice la velocidad de carga y la claridad de los datos financieros.

El Proyecto
La aplicación se conecta directamente con la API de CoinGecko para extraer el precio actual, la variación porcentual de las últimas 24 horas y el historial de precios del último día. A diferencia de otros dashboards saturados, este se enfoca en métricas críticas de la red como el Hash Rate y el estado de los nodos, presentando todo en una interfaz optimizada para el modo oscuro.

Stack Técnico
Para este desarrollo utilicé herramientas que permiten un rendimiento fluido y un tipado fuerte:

React 19 & TypeScript: Para garantizar que el flujo de datos sea consistente y evitar errores en tiempo de ejecución.

Tailwind CSS v4: Implementación de la última versión de Tailwind para un sistema de diseño basado en variables de CSS moderno.

Recharts: Librería de visualización para representar el historial de precios mediante gráficos de área interactivos.

Lucide React: Iconografía técnica y ligera.

Axios: Gestión de peticiones asíncronas para el consumo de la API.

Estructura de la Interfaz
El diseño es completamente responsivo y se adapta a diferentes resoluciones:

Monitor de Precio: Visualización destacada del valor actual en USD con indicadores de tendencia.

Gráfico de Tendencia: Representación visual de los últimos 20 puntos de precio registrados.

Panel de Métricas: Información sobre el poder de minado, nivel de seguridad y recuento de nodos activos en la red.

Sincronización: Sistema de actualización automática cada 60 segundos para mantener los datos frescos sin intervención del usuario.

Instalación y Uso
Si quieres ejecutar este proyecto localmente:

Clona el repositorio: git clone https://github.com/samueldavid-developer/bitcoin-live.git

Instala las dependencias: npm install

Inicia el entorno de desarrollo: npm run dev