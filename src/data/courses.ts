import type { Course } from '@/types'

export const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Trading Algorítmico Pro: de la idea al sistema robusto',
    slug: 'trading-algoritmico-pro',
    description:
      'El programa más completo para construir, validar y desplegar sistemas de trading algorítmico profesionales con Python.',
    longDescription:
      'Un programa intensivo que cubre desde los fundamentos cuantitativos hasta el despliegue en producción de sistemas de trading automatizados. Aprenderás a diseñar estrategias basadas en evidencia estadística, a validarlas con metodologías profesionales y a automatizarlas para que operen 24/7 sin intervención manual. Ideal para traders con experiencia que quieren dar el salto al trading sistemático de alto nivel.',
    level: 'advanced',
    duration: 48,
    price: 497,
    originalPrice: 997,
    rating: 4.9,
    studentsCount: 847,
    thumbnail: '/thumbnails/course-1.jpg',
    instructor: 'Alejandro Vidal',
    updatedAt: '2025-01-15',
    tags: ['Python', 'Backtesting', 'Quant', 'Automatización', 'Risk Management'],
    modules: [
      {
        id: 'c1-m1',
        courseId: 'course-1',
        title: 'Fundamentos del Trading Cuantitativo',
        description:
          'Bases conceptuales y técnicas para entender cómo funciona el trading algorítmico desde dentro.',
        order: 1,
        lessons: [
          {
            id: 'c1-m1-l1',
            moduleId: 'c1-m1',
            courseId: 'course-1',
            title: 'Introducción al trading sistemático',
            description:
              'Qué es el trading algorítmico, cómo se diferencia del trading discrecional y por qué los sistemas superan a las emociones. Exploraremos las ventajas estructurales de los sistemas automáticos: eliminación de sesgos cognitivos, capacidad de procesar múltiples mercados simultáneamente y replicabilidad estadística.',
            duration: 12,
            order: 1,
            resources: [
              {
                id: 'r-c1-m1-l1-1',
                title: 'Guía de fundamentos del trading sistemático',
                type: 'pdf',
                url: '/resources/c1-m1-l1-fundamentos.pdf',
              },
            ],
          },
          {
            id: 'c1-m1-l2',
            moduleId: 'c1-m1',
            courseId: 'course-1',
            title: 'Microestructura de mercados financieros',
            description:
              'Cómo funcionan los mercados por dentro: spreads, liquidez, order book y su impacto en las estrategias. Entenderás por qué el slippage arruina sistemas rentables en papel, cómo modelar los costes de transacción reales y qué tipo de estrategias son viables según el capital y el mercado.',
            duration: 18,
            order: 2,
            resources: [
              {
                id: 'r-c1-m1-l2-1',
                title: 'Análisis de microestructura de mercado',
                type: 'pdf',
                url: '/resources/c1-m1-l2-microestructura.pdf',
              },
              {
                id: 'r-c1-m1-l2-2',
                title: 'Notebook: Análisis del order book',
                type: 'notebook',
                url: '/resources/c1-m1-l2-orderbook.ipynb',
              },
            ],
          },
          {
            id: 'c1-m1-l3',
            moduleId: 'c1-m1',
            courseId: 'course-1',
            title: 'Tipos de estrategias algorítmicas',
            description:
              'Momentum, mean reversion, arbitraje estadístico, market making: características, ventajas e inconvenientes de cada enfoque. Analizaremos ejemplos reales de cada tipo, su comportamiento en diferentes regímenes de mercado y cómo seleccionar el enfoque adecuado para tu perfil y capital.',
            duration: 15,
            order: 3,
            resources: [
              {
                id: 'r-c1-m1-l3-1',
                title: 'Taxonomía de estrategias algorítmicas',
                type: 'pdf',
                url: '/resources/c1-m1-l3-estrategias.pdf',
              },
            ],
          },
          {
            id: 'c1-m1-l4',
            moduleId: 'c1-m1',
            courseId: 'course-1',
            title: 'Configuración del entorno de desarrollo',
            description:
              'Python, Jupyter, bibliotecas clave (pandas, numpy, matplotlib, backtrader). Configuración paso a paso del entorno completo para desarrollo de sistemas de trading. Incluye setup de entornos virtuales, gestión de dependencias y buenas prácticas de organización de proyectos quant.',
            duration: 20,
            order: 4,
            resources: [
              {
                id: 'r-c1-m1-l4-1',
                title: 'Script de configuración del entorno',
                type: 'code',
                url: '/resources/c1-m1-l4-setup.py',
              },
              {
                id: 'r-c1-m1-l4-2',
                title: 'Checklist de instalación y verificación',
                type: 'checklist',
                url: '/resources/c1-m1-l4-checklist.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 'c1-m2',
        courseId: 'course-1',
        title: 'Diseño de Estrategias Sistemáticas',
        description:
          'Metodología científica para diseñar estrategias con edge estadístico real y sostenible.',
        order: 2,
        lessons: [
          {
            id: 'c1-m2-l1',
            moduleId: 'c1-m2',
            courseId: 'course-1',
            title: 'Hipótesis de mercado y búsqueda de edge',
            description:
              'Cómo identificar ineficiencias explotables. El proceso científico aplicado a los mercados. Aprenderás a formular hipótesis comprobables, a separar el ruido estadístico de las señales reales y a evaluar si un patrón observado tiene suficiente base para convertirse en una estrategia.',
            duration: 22,
            order: 1,
            resources: [
              {
                id: 'r-c1-m2-l1-1',
                title: 'Framework de análisis de hipótesis de mercado',
                type: 'pdf',
                url: '/resources/c1-m2-l1-hipotesis.pdf',
              },
              {
                id: 'r-c1-m2-l1-2',
                title: 'Notebook: Identificación de anomalías estadísticas',
                type: 'notebook',
                url: '/resources/c1-m2-l1-anomalias.ipynb',
              },
            ],
          },
          {
            id: 'c1-m2-l2',
            moduleId: 'c1-m2',
            courseId: 'course-1',
            title: 'Señales de entrada: indicadores técnicos cuantitativos',
            description:
              'ATR, ADX, Bollinger Bands desde un enfoque cuantitativo. Cómo combinarlos estadísticamente para crear señales con mayor robustez. Evitaremos los errores típicos del uso ingenuo de indicadores y aprenderemos a medir su poder predictivo real sobre los datos.',
            duration: 25,
            order: 2,
            resources: [
              {
                id: 'r-c1-m2-l2-1',
                title: 'Notebook: Indicadores técnicos cuantitativos',
                type: 'notebook',
                url: '/resources/c1-m2-l2-indicadores.ipynb',
              },
              {
                id: 'r-c1-m2-l2-2',
                title: 'Librería de indicadores personalizados',
                type: 'code',
                url: '/resources/c1-m2-l2-indicators.py',
              },
            ],
          },
          {
            id: 'c1-m2-l3',
            moduleId: 'c1-m2',
            courseId: 'course-1',
            title: 'Reglas de salida: stops y targets',
            description:
              'Stop loss basado en volatilidad, trailing stops, salidas por tiempo. El impacto en el perfil de retorno de la estrategia. Veremos cómo la lógica de salida puede transformar completamente las métricas de un sistema y por qué muchos traders infravaloran su importancia.',
            duration: 18,
            order: 3,
            resources: [
              {
                id: 'r-c1-m2-l3-1',
                title: 'Notebook: Optimización de stops y targets',
                type: 'notebook',
                url: '/resources/c1-m2-l3-stops.ipynb',
              },
            ],
          },
          {
            id: 'c1-m2-l4',
            moduleId: 'c1-m2',
            courseId: 'course-1',
            title: 'Position sizing básico',
            description:
              'Porcentaje fijo, volatilidad-normalizado, position sizing por número de operaciones simultáneas. Aprenderás los modelos fundamentales de sizing y cómo afectan al perfil riesgo/retorno del sistema, incluyendo simulaciones de cómo distintos tamaños de posición cambian la curva de equity.',
            duration: 15,
            order: 4,
            resources: [
              {
                id: 'r-c1-m2-l4-1',
                title: 'Notebook: Modelos de position sizing',
                type: 'notebook',
                url: '/resources/c1-m2-l4-sizing.ipynb',
              },
            ],
          },
          {
            id: 'c1-m2-l5',
            moduleId: 'c1-m2',
            courseId: 'course-1',
            title: 'Tu primera estrategia completa',
            description:
              'Implementamos juntos una estrategia de breakout con filtros de tendencia, stop dinámico y sizing por volatilidad. Iremos paso a paso desde la idea inicial hasta el código completo y funcional, construyendo una estrategia operativa que luego validaremos en el módulo de backtesting.',
            duration: 30,
            order: 5,
            resources: [
              {
                id: 'r-c1-m2-l5-1',
                title: 'Código completo: Primera estrategia breakout',
                type: 'code',
                url: '/resources/c1-m2-l5-breakout.py',
              },
              {
                id: 'r-c1-m2-l5-2',
                title: 'Notebook: Construcción paso a paso',
                type: 'notebook',
                url: '/resources/c1-m2-l5-construccion.ipynb',
              },
            ],
          },
        ],
      },
      {
        id: 'c1-m3',
        courseId: 'course-1',
        title: 'Backtesting Profesional',
        description:
          'Técnicas avanzadas para validar estrategias con rigor estadístico y evitar los errores más comunes.',
        order: 3,
        lessons: [
          {
            id: 'c1-m3-l1',
            moduleId: 'c1-m3',
            courseId: 'course-1',
            title: 'Fundamentos del backtesting correcto',
            description:
              'Qué mide el backtesting, qué no mide, y los errores más comunes que distorsionan los resultados. Estableceremos un marco mental sólido sobre las limitaciones inherentes del backtesting y qué condiciones deben cumplirse para que los resultados históricos sean una referencia útil.',
            duration: 20,
            order: 1,
            resources: [
              {
                id: 'r-c1-m3-l1-1',
                title: 'Guía de backtesting profesional',
                type: 'pdf',
                url: '/resources/c1-m3-l1-backtesting.pdf',
              },
              {
                id: 'r-c1-m3-l1-2',
                title: 'Checklist de validación de backtest',
                type: 'checklist',
                url: '/resources/c1-m3-l1-checklist.pdf',
              },
            ],
          },
          {
            id: 'c1-m3-l2',
            moduleId: 'c1-m3',
            courseId: 'course-1',
            title: 'Overfitting, look-ahead bias y otras trampas',
            description:
              'Los errores que hacen que un backtest sea una mentira. Cómo detectarlos y evitarlos sistemáticamente. Cubriremos el overfitting por optimización excesiva de parámetros, el look-ahead bias clásico y sus formas sutiles, la contaminación de datos y el survivorship bias.',
            duration: 25,
            order: 2,
            resources: [
              {
                id: 'r-c1-m3-l2-1',
                title: 'Notebook: Detección de overfitting y bias',
                type: 'notebook',
                url: '/resources/c1-m3-l2-overfitting.ipynb',
              },
            ],
          },
          {
            id: 'c1-m3-l3',
            moduleId: 'c1-m3',
            courseId: 'course-1',
            title: 'Walk-forward analysis',
            description:
              'Técnica de validación rolling que simula el uso real del sistema en el tiempo. Implementaremos un walk-forward completo, compararemos sus resultados con el backtest estándar y veremos cómo usar esta técnica para calibrar parámetros de forma robusta y no sobreajustada.',
            duration: 22,
            order: 3,
            resources: [
              {
                id: 'r-c1-m3-l3-1',
                title: 'Notebook: Walk-forward analysis completo',
                type: 'notebook',
                url: '/resources/c1-m3-l3-walkforward.ipynb',
              },
              {
                id: 'r-c1-m3-l3-2',
                title: 'Framework de walk-forward reutilizable',
                type: 'code',
                url: '/resources/c1-m3-l3-wfa.py',
              },
            ],
          },
          {
            id: 'c1-m3-l4',
            moduleId: 'c1-m3',
            courseId: 'course-1',
            title: 'Out-of-sample testing y robustez',
            description:
              'Separar datos de desarrollo y datos de validación. Monte Carlo simulation para estimar la dispersión de resultados futuros. Aprenderás a construir una metodología de testing que maximice las probabilidades de que el rendimiento live se acerque al rendimiento histórico.',
            duration: 18,
            order: 4,
            resources: [
              {
                id: 'r-c1-m3-l4-1',
                title: 'Notebook: Monte Carlo y test de robustez',
                type: 'notebook',
                url: '/resources/c1-m3-l4-montecarlo.ipynb',
              },
            ],
          },
        ],
      },
      {
        id: 'c1-m4',
        courseId: 'course-1',
        title: 'Gestión de Riesgo Cuantitativa',
        description:
          'Técnicas profesionales de sizing, control de drawdown y diversificación de sistemas.',
        order: 4,
        lessons: [
          {
            id: 'c1-m4-l1',
            moduleId: 'c1-m4',
            courseId: 'course-1',
            title: 'Drawdown, expectativa y valor esperado',
            description:
              'Métricas fundamentales para entender si un sistema es operativo y cómo se comportará en el futuro. Aprenderás a calcular y interpretar el drawdown máximo esperado, la expectativa matemática por operación y cómo estas métricas determinan los requisitos mínimos de capital.',
            duration: 20,
            order: 1,
            resources: [
              {
                id: 'r-c1-m4-l1-1',
                title: 'Notebook: Análisis de drawdown y expectativa',
                type: 'notebook',
                url: '/resources/c1-m4-l1-drawdown.ipynb',
              },
            ],
          },
          {
            id: 'c1-m4-l2',
            moduleId: 'c1-m4',
            courseId: 'course-1',
            title: 'Kelly Criterion y optimal f',
            description:
              'El sizing matemáticamente óptimo. Por qué operamos con Kelly fraccionado y cómo calcularlo para nuestro sistema específico. Exploraremos las derivaciones teóricas, los riesgos del Kelly completo y las estrategias prácticas para implementar fractional Kelly en sistemas reales.',
            duration: 22,
            order: 2,
            resources: [
              {
                id: 'r-c1-m4-l2-1',
                title: 'Notebook: Cálculo de Kelly y optimal f',
                type: 'notebook',
                url: '/resources/c1-m4-l2-kelly.ipynb',
              },
              {
                id: 'r-c1-m4-l2-2',
                title: 'Calculadora de Kelly Criterion',
                type: 'code',
                url: '/resources/c1-m4-l2-kelly-calc.py',
              },
            ],
          },
          {
            id: 'c1-m4-l3',
            moduleId: 'c1-m4',
            courseId: 'course-1',
            title: 'Correlaciones y diversificación de sistemas',
            description:
              'Combinar múltiples sistemas no correlacionados. El efecto en riesgo/retorno del portfolio de sistemas. Veremos cómo la combinación de estrategias con baja correlación permite reducir el drawdown del portfolio sin sacrificar retorno, y cómo medir y gestionar este beneficio.',
            duration: 18,
            order: 3,
            resources: [
              {
                id: 'r-c1-m4-l3-1',
                title: 'Notebook: Análisis de correlaciones entre sistemas',
                type: 'notebook',
                url: '/resources/c1-m4-l3-correlaciones.ipynb',
              },
            ],
          },
          {
            id: 'c1-m4-l4',
            moduleId: 'c1-m4',
            courseId: 'course-1',
            title: 'Gestión dinámica del riesgo',
            description:
              'Reducir exposición en periodos de alta volatilidad o drawdown. Regime detection básico para ajustar el tamaño de posición según el estado del mercado. Implementaremos filtros de volatilidad y métricas de regime que permiten al sistema adaptarse a diferentes condiciones de mercado.',
            duration: 20,
            order: 4,
            resources: [
              {
                id: 'r-c1-m4-l4-1',
                title: 'Notebook: Gestión dinámica y regime detection',
                type: 'notebook',
                url: '/resources/c1-m4-l4-dynamic-risk.ipynb',
              },
              {
                id: 'r-c1-m4-l4-2',
                title: 'Módulo de gestión dinámica de riesgo',
                type: 'code',
                url: '/resources/c1-m4-l4-risk-manager.py',
              },
            ],
          },
        ],
      },
      {
        id: 'c1-m5',
        courseId: 'course-1',
        title: 'Métricas y Evaluación de Sistemas',
        description:
          'Las métricas correctas para evaluar si un sistema tiene el rendimiento necesario para operar en real.',
        order: 5,
        lessons: [
          {
            id: 'c1-m5-l1',
            moduleId: 'c1-m5',
            courseId: 'course-1',
            title: 'Sharpe Ratio, Sortino y sus variantes',
            description:
              'Las métricas de ajuste por riesgo más usadas. Cómo interpretarlas y sus limitaciones en contextos de trading sistemático. Aprenderás por qué el Sharpe clásico puede ser engañoso con distribuciones no normales y qué variantes son más adecuadas para estrategias con colas pesadas.',
            duration: 18,
            order: 1,
            resources: [
              {
                id: 'r-c1-m5-l1-1',
                title: 'Notebook: Cálculo e interpretación de Sharpe y Sortino',
                type: 'notebook',
                url: '/resources/c1-m5-l1-sharpe.ipynb',
              },
            ],
          },
          {
            id: 'c1-m5-l2',
            moduleId: 'c1-m5',
            courseId: 'course-1',
            title: 'Calmar Ratio, MAR y métricas de drawdown',
            description:
              'Evaluar la eficiencia por unidad de drawdown máximo. Cuándo preferir Calmar sobre Sharpe y por qué para el trading direccional el drawdown es la métrica de riesgo más relevante. Implementaremos un dashboard completo de métricas de evaluación de sistemas.',
            duration: 15,
            order: 2,
            resources: [
              {
                id: 'r-c1-m5-l2-1',
                title: 'Librería de métricas de evaluación',
                type: 'code',
                url: '/resources/c1-m5-l2-metrics.py',
              },
            ],
          },
          {
            id: 'c1-m5-l3',
            moduleId: 'c1-m5',
            courseId: 'course-1',
            title: 'Análisis estadístico: t-test y bootstrap',
            description:
              'Determinar si los resultados son estadísticamente significativos o producto del azar. Aplicaremos t-tests, tests de permutación y técnicas de bootstrap para calcular intervalos de confianza y estimar la probabilidad de que el edge observado sea real y no un artefacto estadístico.',
            duration: 22,
            order: 3,
            resources: [
              {
                id: 'r-c1-m5-l3-1',
                title: 'Notebook: Tests estadísticos para sistemas de trading',
                type: 'notebook',
                url: '/resources/c1-m5-l3-statistical-tests.ipynb',
              },
              {
                id: 'r-c1-m5-l3-2',
                title: 'Guía de significancia estadística en trading',
                type: 'pdf',
                url: '/resources/c1-m5-l3-significancia.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 'c1-m6',
        courseId: 'course-1',
        title: 'Despliegue y Automatización',
        description:
          'Del código a producción: arquitectura, brokers, monitorización y mantenimiento de sistemas vivos.',
        order: 6,
        lessons: [
          {
            id: 'c1-m6-l1',
            moduleId: 'c1-m6',
            courseId: 'course-1',
            title: 'Arquitectura de un sistema de trading en producción',
            description:
              'Data feed, motor de señales, gestión de órdenes, broker API, logging. El stack completo de un sistema profesional en producción. Diseñaremos una arquitectura limpia, modular y tolerante a fallos que pueda ejecutarse en un servidor cloud con mínima intervención.',
            duration: 25,
            order: 1,
            resources: [
              {
                id: 'r-c1-m6-l1-1',
                title: 'Diagrama de arquitectura del sistema',
                type: 'pdf',
                url: '/resources/c1-m6-l1-arquitectura.pdf',
              },
              {
                id: 'r-c1-m6-l1-2',
                title: 'Template de proyecto de trading en producción',
                type: 'code',
                url: '/resources/c1-m6-l1-project-template.zip',
              },
            ],
          },
          {
            id: 'c1-m6-l2',
            moduleId: 'c1-m6',
            courseId: 'course-1',
            title: 'Conexión con brokers via API',
            description:
              'Interactive Brokers API y Alpaca como alternativas. Envío y gestión de órdenes en tiempo real. Cubriremos autenticación, gestión de conexión, tipos de órdenes, manejo de errores y reconexión automática. Veremos también cómo normalizar la interfaz para poder cambiar de broker sin reescribir la lógica.',
            duration: 28,
            order: 2,
            resources: [
              {
                id: 'r-c1-m6-l2-1',
                title: 'Módulo de conexión con brokers',
                type: 'code',
                url: '/resources/c1-m6-l2-broker-connector.py',
              },
              {
                id: 'r-c1-m6-l2-2',
                title: 'Checklist de configuración del broker',
                type: 'checklist',
                url: '/resources/c1-m6-l2-broker-checklist.pdf',
              },
            ],
          },
          {
            id: 'c1-m6-l3',
            moduleId: 'c1-m6',
            courseId: 'course-1',
            title: 'Monitorización, alertas y logging',
            description:
              'Sistema de alertas por Telegram y email, logs estructurados con niveles, detección automática de anomalías. Construiremos un sistema de observabilidad completo que nos permita supervisar el estado del sistema, recibir alertas en tiempo real y diagnosticar problemas rápidamente.',
            duration: 20,
            order: 3,
            resources: [
              {
                id: 'r-c1-m6-l3-1',
                title: 'Módulo de alertas y logging estructurado',
                type: 'code',
                url: '/resources/c1-m6-l3-monitoring.py',
              },
            ],
          },
          {
            id: 'c1-m6-l4',
            moduleId: 'c1-m6',
            courseId: 'course-1',
            title: 'Mantenimiento y actualización de sistemas vivos',
            description:
              'Cuándo intervenir, cuándo no. Monitorización de degradación del edge. Proceso de re-optimización controlado. Aprenderás a establecer criterios objetivos para decidir cuándo un sistema necesita revisión, cómo hacer cambios de forma segura y cómo gestionar el ciclo de vida de un sistema en producción.',
            duration: 18,
            order: 4,
            resources: [
              {
                id: 'r-c1-m6-l4-1',
                title: 'Guía de mantenimiento de sistemas de trading',
                type: 'pdf',
                url: '/resources/c1-m6-l4-mantenimiento.pdf',
              },
              {
                id: 'r-c1-m6-l4-2',
                title: 'Checklist de revisión periódica del sistema',
                type: 'checklist',
                url: '/resources/c1-m6-l4-revision-checklist.pdf',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'course-2',
    title: 'Python para Traders: Automatización y Backtesting',
    slug: 'python-para-traders',
    description:
      'Aprende Python aplicado al trading desde cero: análisis de datos financieros, backtesting de estrategias y automatización básica.',
    longDescription:
      'Un programa práctico e intensivo para traders que quieren dominar Python como herramienta principal de análisis y automatización. Sin asumir conocimientos previos de programación, aprenderás a manejar datos financieros, construir y testear estrategias, y dar tus primeros pasos en la automatización. El enfoque es 100% práctico con casos de uso reales desde el primer módulo.',
    level: 'intermediate',
    duration: 24,
    price: 297,
    originalPrice: 497,
    rating: 4.8,
    studentsCount: 1243,
    thumbnail: '/thumbnails/course-2.jpg',
    instructor: 'Alejandro Vidal',
    updatedAt: '2025-01-20',
    tags: ['Python', 'Pandas', 'Backtesting', 'Automatización', 'Data Analysis'],
    modules: [
      {
        id: 'c2-m1',
        courseId: 'course-2',
        title: 'Python para Datos Financieros',
        description:
          'Domina las herramientas fundamentales de Python para trabajar con datos de mercados financieros.',
        order: 1,
        lessons: [
          {
            id: 'c2-m1-l1',
            moduleId: 'c2-m1',
            courseId: 'course-2',
            title: 'Pandas y NumPy para datos de mercado',
            description:
              'Fundamentos de pandas aplicados a series temporales financieras. Importación, limpieza y transformación de datos OHLCV. Aprenderás a trabajar con DataFrames indexados por fecha, a calcular retornos y a preparar datos para análisis posterior.',
            duration: 22,
            order: 1,
            resources: [
              {
                id: 'r-c2-m1-l1-1',
                title: 'Notebook: Introducción a pandas financiero',
                type: 'notebook',
                url: '/resources/c2-m1-l1-pandas.ipynb',
              },
            ],
          },
          {
            id: 'c2-m1-l2',
            moduleId: 'c2-m1',
            courseId: 'course-2',
            title: 'Descarga y gestión de datos históricos',
            description:
              'APIs gratuitas y de pago para obtener datos históricos: yfinance, Alpha Vantage, Quandl. Construcción de una pipeline de datos robusta que descargue, limpie y almacene datos históricos de forma eficiente y reproducible.',
            duration: 18,
            order: 2,
            resources: [
              {
                id: 'r-c2-m1-l2-1',
                title: 'Pipeline de descarga de datos',
                type: 'code',
                url: '/resources/c2-m1-l2-data-pipeline.py',
              },
              {
                id: 'r-c2-m1-l2-2',
                title: 'Notebook: Fuentes de datos financieros',
                type: 'notebook',
                url: '/resources/c2-m1-l2-fuentes.ipynb',
              },
            ],
          },
          {
            id: 'c2-m1-l3',
            moduleId: 'c2-m1',
            courseId: 'course-2',
            title: 'Visualización de datos de mercado con Matplotlib y Plotly',
            description:
              'Creación de gráficos de candlestick, indicadores superpuestos, paneles de análisis y dashboards básicos. Aprenderás a crear visualizaciones profesionales que faciliten el análisis de estrategias y la comunicación de resultados.',
            duration: 20,
            order: 3,
            resources: [
              {
                id: 'r-c2-m1-l3-1',
                title: 'Notebook: Visualización avanzada de mercados',
                type: 'notebook',
                url: '/resources/c2-m1-l3-visualizacion.ipynb',
              },
            ],
          },
          {
            id: 'c2-m1-l4',
            moduleId: 'c2-m1',
            courseId: 'course-2',
            title: 'Indicadores técnicos con Python: TA-Lib y pandas_ta',
            description:
              'Implementación y uso de más de 50 indicadores técnicos. Comparativa entre bibliotecas y criterios de selección. Aprenderás a calcular, interpretar y combinar indicadores técnicos de forma eficiente usando las mejores bibliotecas disponibles para Python.',
            duration: 25,
            order: 4,
            resources: [
              {
                id: 'r-c2-m1-l4-1',
                title: 'Notebook: Catálogo de indicadores técnicos',
                type: 'notebook',
                url: '/resources/c2-m1-l4-indicadores.ipynb',
              },
              {
                id: 'r-c2-m1-l4-2',
                title: 'Guía de selección de indicadores',
                type: 'pdf',
                url: '/resources/c2-m1-l4-guia.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 'c2-m2',
        courseId: 'course-2',
        title: 'Backtesting con Python',
        description:
          'Construye y prueba estrategias de trading usando Python y las principales bibliotecas de backtesting.',
        order: 2,
        lessons: [
          {
            id: 'c2-m2-l1',
            moduleId: 'c2-m2',
            courseId: 'course-2',
            title: 'Backtesting vectorizado con pandas',
            description:
              'El enfoque más rápido para probar estrategias: backtesting vectorizado sin loops. Aprenderás a construir un motor de backtesting simple usando solo pandas, a calcular retornos de estrategia y a evaluar resultados básicos de forma eficiente.',
            duration: 22,
            order: 1,
            resources: [
              {
                id: 'r-c2-m2-l1-1',
                title: 'Notebook: Backtesting vectorizado',
                type: 'notebook',
                url: '/resources/c2-m2-l1-vectorized.ipynb',
              },
            ],
          },
          {
            id: 'c2-m2-l2',
            moduleId: 'c2-m2',
            courseId: 'course-2',
            title: 'Backtrader: el framework completo',
            description:
              'Introducción a Backtrader: estrategias, indicadores, analyzers, commission schemes. Construiremos tres estrategias completas usando Backtrader y aprenderemos a aprovechar su sistema de analyzers para extraer métricas detalladas de rendimiento.',
            duration: 28,
            order: 2,
            resources: [
              {
                id: 'r-c2-m2-l2-1',
                title: 'Notebook: Estrategias con Backtrader',
                type: 'notebook',
                url: '/resources/c2-m2-l2-backtrader.ipynb',
              },
              {
                id: 'r-c2-m2-l2-2',
                title: 'Templates de estrategias Backtrader',
                type: 'code',
                url: '/resources/c2-m2-l2-templates.py',
              },
            ],
          },
          {
            id: 'c2-m2-l3',
            moduleId: 'c2-m2',
            courseId: 'course-2',
            title: 'Métricas de rendimiento: de básico a avanzado',
            description:
              'Win rate, profit factor, Sharpe Ratio, máximo drawdown y sus variantes. Implementaremos un módulo de métricas completo que puedas reutilizar en todos tus proyectos de backtesting, con visualizaciones incluidas para facilitar la interpretación de resultados.',
            duration: 20,
            order: 3,
            resources: [
              {
                id: 'r-c2-m2-l3-1',
                title: 'Módulo de métricas de rendimiento',
                type: 'code',
                url: '/resources/c2-m2-l3-metrics.py',
              },
            ],
          },
          {
            id: 'c2-m2-l4',
            moduleId: 'c2-m2',
            courseId: 'course-2',
            title: 'Optimización de parámetros y sus peligros',
            description:
              'Grid search, random search y optimización bayesiana aplicadas a estrategias de trading. Aprenderás a optimizar parámetros de forma controlada, a detectar cuándo has caído en overfitting y a diseñar rangos de optimización que produzcan resultados más robustos y generalizables.',
            duration: 24,
            order: 4,
            resources: [
              {
                id: 'r-c2-m2-l4-1',
                title: 'Notebook: Optimización controlada de parámetros',
                type: 'notebook',
                url: '/resources/c2-m2-l4-optimizacion.ipynb',
              },
              {
                id: 'r-c2-m2-l4-2',
                title: 'Checklist de validación post-optimización',
                type: 'checklist',
                url: '/resources/c2-m2-l4-checklist.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 'c2-m3',
        courseId: 'course-2',
        title: 'Automatización y Despliegue',
        description:
          'Da el salto de los notebooks a sistemas automatizados que operan de forma autónoma.',
        order: 3,
        lessons: [
          {
            id: 'c2-m3-l1',
            moduleId: 'c2-m3',
            courseId: 'course-2',
            title: 'Paper trading: prueba sin riesgo',
            description:
              'Implementación de un sistema de paper trading para validar tu estrategia en condiciones de mercado reales antes de arriesgar capital. Aprenderás a conectarte con APIs de brokers en modo sandbox, a simular órdenes realistas y a comparar el rendimiento del paper trading con tu backtest.',
            duration: 18,
            order: 1,
            resources: [
              {
                id: 'r-c2-m3-l1-1',
                title: 'Módulo de paper trading con Alpaca',
                type: 'code',
                url: '/resources/c2-m3-l1-paper-trading.py',
              },
            ],
          },
          {
            id: 'c2-m3-l2',
            moduleId: 'c2-m3',
            courseId: 'course-2',
            title: 'Automatización con cron jobs y tareas programadas',
            description:
              'Ejecución automática de tu estrategia en horarios definidos. Configuración en Linux/Mac con cron y en Windows con Task Scheduler. Aprenderás a estructurar el código para que sea ejecutable desde línea de comandos, a gestionar logs y a manejar errores de forma robusta en ejecución desatendida.',
            duration: 15,
            order: 2,
            resources: [
              {
                id: 'r-c2-m3-l2-1',
                title: 'Guía de configuración de cron jobs para trading',
                type: 'pdf',
                url: '/resources/c2-m3-l2-cron.pdf',
              },
              {
                id: 'r-c2-m3-l2-2',
                title: 'Script de ejemplo con logging y manejo de errores',
                type: 'code',
                url: '/resources/c2-m3-l2-scheduled-job.py',
              },
            ],
          },
          {
            id: 'c2-m3-l3',
            moduleId: 'c2-m3',
            courseId: 'course-2',
            title: 'Despliegue en la nube: VPS y Railway',
            description:
              'Despliegue de tu sistema de trading en un servidor cloud para ejecución 24/7. Cubriremos la configuración de un VPS en DigitalOcean o Railway, el despliegue del código, la gestión segura de credenciales con variables de entorno y la monitorización básica del proceso.',
            duration: 20,
            order: 3,
            resources: [
              {
                id: 'r-c2-m3-l3-1',
                title: 'Checklist de despliegue en producción',
                type: 'checklist',
                url: '/resources/c2-m3-l3-deploy-checklist.pdf',
              },
              {
                id: 'r-c2-m3-l3-2',
                title: 'Dockerfile para sistema de trading',
                type: 'code',
                url: '/resources/c2-m3-l3-dockerfile',
              },
            ],
          },
          {
            id: 'c2-m3-l4',
            moduleId: 'c2-m3',
            courseId: 'course-2',
            title: 'Notificaciones y monitorización básica',
            description:
              'Configura alertas por Telegram y email para mantenerte informado de las operaciones de tu sistema sin necesidad de monitorización constante. Implementaremos un sistema de notificaciones que te avise de nuevas operaciones, errores críticos y métricas de rendimiento diarias.',
            duration: 12,
            order: 4,
            resources: [
              {
                id: 'r-c2-m3-l4-1',
                title: 'Módulo de notificaciones Telegram + Email',
                type: 'code',
                url: '/resources/c2-m3-l4-notifications.py',
              },
            ],
          },
        ],
      },
    ],
  },
]
