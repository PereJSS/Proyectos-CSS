# Migración a Sass @use

Este proyecto ha sido actualizado para usar la nueva sintaxis `@use` de Sass en lugar de `@import` (que será deprecado).

## Cambios Principales

### 1. Estructura de Archivos
- **`app.scss`**: Archivo principal que usa `@forward` para hacer variables, funciones, mixins y placeholders disponibles globalmente
- **`_abstracts.scss`**: Usa `@forward` para exportar todos los abstracts
- Otros archivos de índice usan `@use` para importar módulos

### 2. Uso de Variables y Mixins

#### Antes (con @import):
```scss
@import 'abstracts/variables';
@import 'abstracts/mixins';

.example {
  font-family: $roboto-font;
  @include breakpoint(mobile) {
    font-size: 0.9rem;
  }
}
```

#### Ahora (con @use y @forward):
```scss
// En app.scss - forwarding hace las variables globales
@forward "./abstracts/variables";
@forward "./abstracts/mixins";

// En cualquier otro archivo
.example {
  font-family: $roboto-font; // Directamente accesible
  @include breakpoint(mobile) { // Directamente accesible
    font-size: 0.9rem;
  }
}
```

### 3. Beneficios de @use

1. **Namespaces**: Evita conflictos de nombres
2. **Carga única**: Cada archivo se carga solo una vez
3. **Mejor rendimiento**: Optimización en tiempo de compilación
4. **Futuro-compatible**: `@import` será deprecado

### 4. Estructura Actualizada

```
sass/
├── app.scss              # Archivo principal con @forward/@use
├── _settings.scss        # Configuraciones específicas
├── abstracts/
│   ├── _abstracts.scss   # Forward de todos los abstracts
│   ├── _variables.scss   # Variables globales
│   ├── _functions.scss   # Funciones personalizadas
│   ├── _mixins.scss      # Mixins globales
│   └── _placeholders.scss # Placeholders globales
├── base/
│   ├── _base.scss        # Import de estilos base
│   ├── _reset.scss       # Reset/normalize
│   └── _typography.scss  # Tipografía (actualizada con ejemplos)
├── components/
│   ├── _components.scss  # Import de componentes
│   └── _buttons.scss     # Botones (actualizado con ejemplos)
├── layout/
│   ├── _layout.scss      # Import de layout
│   ├── _header.scss      # Header
│   ├── _footer.scss      # Footer
│   ├── _navbar.scss      # Navegación
│   ├── _sidebar.scss     # Sidebar
│   ├── _grid.scss        # Sistema de grillas
│   └── _forms.scss       # Formularios
├── pages/
│   ├── _pages.scss       # Import de páginas
│   └── _home.scss        # Página home
├── themes/
│   ├── _themes.scss      # Import de temas
│   └── _default.scss     # Tema por defecto
└── vendors/
    └── _vendors.scss     # Librerías externas
```

### 5. Cómo Agregar Nuevos Estilos

Para agregar nuevos componentes, páginas o estilos:

1. Crear el archivo parcial (ej: `_nuevo-componente.scss`)
2. Agregar `@use 'nuevo-componente';` en el archivo índice correspondiente
3. Usar variables, mixins y funciones directamente (están disponibles globalmente)

### 6. Compatibilidad

Esta estructura es compatible con:
- **Sass 1.23.0+** (requerido para @use)
- **Webpack** con sass-loader
- **Vite** con sass
- **Node-sass** (aunque se recomienda migrar a Dart Sass)

### 7. Compilación

El archivo principal de entrada sigue siendo `sass/app.scss`. No se requieren cambios en la configuración de webpack o herramientas de build.