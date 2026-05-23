Esta es parte de mi logica de mi gateway en el backend, su funcion es verificar tokens y dependiendo del tipo de usuario permitir el acceso a ciertos endpoints, sin embargo estamos encontrando muchos problemas al intentar usarlo con el frontend actual, dime cual seria la mejor forma de conciliar esto con el frontend actual, se aceptan sugerencias de cambios tanto en backend como en frontend. Ahora te doy la configuracion actual:
Gateway.application.yml:
jwt:
  secret: "3KTMZ7An77+TnowBQVy0+Nop3ADuwmIIbcTszYkOAYY="
spring:
  cloud:
    gateway:
      server:
        webflux:
          discovery:
            locator:
              enabled: true
              lower-case-service-id: true
          globalcors:
            add-to-simple-url-handler-mapping: true
            cors-configurations:
              '[/**]':
                allowed-origin-patterns:
                  - "http://localhost:3000"
                allowed-methods:
                  - GET
                  - POST
                  - PUT
                  - DELETE
                  - PATCH
                  - OPTIONS
                allowed-headers:
                  - Content-Type
                  - Authorization
                  - X-Requested-With
                  - Accept
                  - Origin
                allow-credentials: true
                max-age: 3600
          routes:
            - id: microservicio-insumos
              uri: lb://microservicio-insumos
              predicates:
                - Path=/api/insumos/**
              filters:
                - StripPrefix=1
            - id: microservicio-producto
              uri: lb://microservicio-producto
              predicates:
                - Path=/api/productos/**
              filters:
                - StripPrefix=1
            - id: microservicio-proveedor
              uri: lb://microservicio-proveedor
              predicates:
                - Path=/api/proveedores/**
              filters:
                - StripPrefix=1
            - id: microservicio-mermas
              uri: lb://microservicio-mermas
              predicates:
                - Path=/api/mermas/**
              filters:
                - StripPrefix=1
            - id: microservicio-eventos
              uri: lb://microservicio-eventos
              predicates:
                - Path=/api/eventos/**
              filters:
                - StripPrefix=1
            - id: microservicio-mesas
              uri: lb://microservicio-mesas
              predicates:
                - Path=/api/mesas/**
              filters:
                - StripPrefix=1
            - id: microservicio-pedidos
              uri: lb://microservicio-pedidos
              predicates:
                - Path=/api/pedidos/**
              filters:
                - StripPrefix=1
            - id: microservicio-cocina
              uri: lb://microservicio-cocina
              predicates:
                - Path=/api/cocina/**
              filters:
                - StripPrefix=1
            - id: microservicio-pagos
              uri: lb://microservicio-pagos
              predicates:
                - Path=/api/pagos/**
              filters:
                - StripPrefix=1
            - id: microservicio-users
              uri: lb://microservicio-users
              predicates:
                - Path=/api/usuarios/**
              filters:
                - StripPrefix=1
            - id: microservicio-reservas
              uri: lb://microservicio-reservas
              predicates:
                - Path=/api/reservas/**
              filters:
                - StripPrefix=1



#Gateway.SecurityConfig

package com.Gateway.Server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import reactor.core.publisher.Mono;
import com.Gateway.Server.security.JwtAuthenticationManager;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

   @Bean
   public AuthenticationWebFilter jwtAuthenticationWebFilter(JwtAuthenticationManager authManager){
       AuthenticationWebFilter filter = new AuthenticationWebFilter(authManager);
       filter.setServerAuthenticationConverter(exchange -> {
           System.out.println("AUTH FILTER EXECUTED");
           String authHeader = exchange
                   .getRequest()
                   .getHeaders()
                   .getFirst(HttpHeaders.AUTHORIZATION);
           System.out.println("Header: " + authHeader);
           if(authHeader == null || !authHeader.startsWith("Bearer ")){
               return Mono.empty();
           }
           String token = authHeader.substring(7);
           return Mono.just(new UsernamePasswordAuthenticationToken(null, token));
       });
       filter.setAuthenticationFailureHandler((webFilterExchange, exception) ->{
           webFilterExchange.getExchange()
                   .getResponse()
                   .setStatusCode(HttpStatus.UNAUTHORIZED);
           return webFilterExchange.getExchange()
                   .getResponse()
                   .setComplete();
               }
               );
       return filter;
   }

    private static final String[] PUBLIC_POST_ENDPOINTS = {
            "/api/usuarios/login",
            "/api/usuarios/registro",
            "/api/eventos/**",
            "/api/reservas/**"
    };
    private static final String[] PUBLIC_GET_ENDPOINTS = {
            "/api/productos/**"
    };
    // -------------
    // ADMIN ONLY
    // -------------
    private static final String[] ADMIN_ENDPOINTS = {
            "/api/insumos/**",
            "/api/mermas/**",
            "/api/proveedores/**",
            "/api/usuarios/**"
    };
    // -------------
    // ADMIN Y CLIENTE
    // -------------
    private static final String[] ADMIN_CLIENTE_ENDPOINTS = {
            "/api/eventos/**",
            "/api/reservas/**"
    };
    // -------------
    // ADMIN, MESERO Y CLIENTE
    // -------------
    private static final String[] COCINA_ENDPOINTS = {
            "/api/pedidos/**",
            "/api/cocina/**"
    };
    // -------------
    // ADMIN Y MESERO
    // -------------
    private static  final String[] MESERO_ADMIN_EDNPOINTS = {
           "/api/pagos/**",
            "/api/mesas/**"
    };
    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http, JwtAuthenticationManager authManager){
        return http
                //Deshabilitamos seguridad por default
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                //Filtro JWT
                .addFilterAt(
                        jwtAuthenticationWebFilter(authManager),
                        SecurityWebFiltersOrder.AUTHENTICATION
                )
                //MANEJO DE EXCEPCIONES
                .exceptionHandling(exceptions -> exceptions.authenticationEntryPoint((swe, e) ->
                {
                    swe.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return swe.getResponse().setComplete();
                }))
                //REGLAS DE AUTENTICACIÓN
                .authorizeExchange(exchange -> exchange
                        //CORS
                        .pathMatchers(HttpMethod.OPTIONS, "/**")
                        .permitAll()
                        //Publicos
                        .pathMatchers(HttpMethod.POST, PUBLIC_POST_ENDPOINTS)
                        .permitAll()
                        //Catálogo productos público
                        .pathMatchers(HttpMethod.GET, PUBLIC_GET_ENDPOINTS)
                        .permitAll()
                        //Admin
                        .pathMatchers(ADMIN_ENDPOINTS)
                        .hasAuthority("ADMINISTRADOR")
                        //Cliente/admin
                        .pathMatchers(ADMIN_CLIENTE_ENDPOINTS)
                        .hasAnyAuthority("CLIENTE", "ADMINISTRADOR")
                        //Mesero
                        .pathMatchers(COCINA_ENDPOINTS)
                        .hasAnyAuthority("MESERO", "COCINERO", "ADMINISTRADOR")
                        //Mesero + admin
                        .pathMatchers(MESERO_ADMIN_EDNPOINTS)
                        .hasAnyAuthority("MESERO", "ADMINISTRADOR")
                        //Default
                        .anyExchange()
                        .authenticated()
                )
                .build();

    }
}
