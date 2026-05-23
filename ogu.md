microservicio-cocina
package com.microservicio.cocina.controller;
import com.microservicio.cocina.dto.*;
import com.microservicio.cocina.entity.PedidoCocina;
import com.microservicio.cocina.mapper.PedidoCocinaMapper;
import com.microservicio.cocina.service.PedidoCocinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/cocina")
public class PedidoCocinaController {
    @Autowired
    private  PedidoCocinaService pedidoCocinaService;
    @Autowired
    private  PedidoCocinaMapper pedidoCocinaMapper;

    @PostMapping("/pedidos")
    public ResponseEntity<PedidoCocinaResponseDTO> recibirPedido(
            @RequestBody CrearPedidoCocinaRequestDTO request) {
        PedidoCocinaResponseDTO pedido = pedidoCocinaService.recibirPedido(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
    }
    @GetMapping("/pedidos/pendientes")
    public ResponseEntity<List<PedidoCocinaResponseDTO>> getPedidosPendientes() {
        return ResponseEntity.ok(pedidoCocinaService.getPedidosPendientes());
    }
    @GetMapping("/pedidos/{ordenId}")
    public ResponseEntity<PedidoCocinaResponseDTO> getPedidoByOrdenId(
            @PathVariable String ordenId) {
        return ResponseEntity.ok(pedidoCocinaService.getPedidoByOrdenId(ordenId));
    }
    @PatchMapping("/items/{itemId}/completado")
    public ResponseEntity<ItemCocinaResponseDTO> marcarItemCompletado(
            @PathVariable Long itemId) {
        return ResponseEntity.ok(pedidoCocinaService.marcarItemCompletado(itemId));
    }
    @PatchMapping("/pedidos/{ordenId}/servido")
    public ResponseEntity<Void> marcarPedidoServido(@PathVariable String ordenId) {
        pedidoCocinaService.marcarPedidoServido(ordenId);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/pedidos/historial")
    public ResponseEntity<List<PedidoCocinaResponseDTO>> getHistorialPedidos() {
        List<PedidoCocina> historial = pedidoCocinaService.getHistorialPedidos();
        return ResponseEntity.ok(historial.stream()
                .map(pedidoCocinaMapper::toResponseDTO)
                .collect(Collectors.toList()));
    }
}
microservicio eventos:
package com.microservicio.eventos.Controller;
import com.microservicio.eventos.dto.EventoRequestDTO;
import com.microservicio.eventos.dto.EventoResponseDTO;
import com.microservicio.eventos.dto.EventoStatusUpdateDTO;
import com.microservicio.eventos.Services.EventoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/eventos")
@RequiredArgsConstructor
public class EventoController {
    private final EventoService eventoService;
    @PostMapping("/crear")
    public ResponseEntity<EventoResponseDTO> createEvento(@Valid @RequestBody EventoRequestDTO dto) {
        EventoResponseDTO response = eventoService.createEvento(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @GetMapping("/all")
    public ResponseEntity<Page<EventoResponseDTO>> getAllEventos(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(eventoService.getAllEventos(pageable));
    }
    @GetMapping("/{id}")
    public ResponseEntity<EventoResponseDTO> getEventoById(@PathVariable Long id) {
        return ResponseEntity.ok(eventoService.getEventoById(id));
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<EventoResponseDTO> updateEventoStatus(
            @PathVariable Long id,
            @Valid @RequestBody EventoStatusUpdateDTO updateDTO) {
        return ResponseEntity.ok(eventoService.updateEventoStatus(id, updateDTO));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvento(@PathVariable Long id) {
        eventoService.deleteEvento(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/status/{status}")
    public ResponseEntity<Page<EventoResponseDTO>> getEventosByStatus(
            @PathVariable String status,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(eventoService.getEventosByStatus(status, pageable));
    }
    @GetMapping("/stats")
    public ResponseEntity<Object> getEventoStats() {
        return ResponseEntity.ok(eventoService.getEventoStats());
    }

    @GetMapping("/search")
    public ResponseEntity<List<EventoResponseDTO>> searchByEmail(@RequestParam String email) {
        return ResponseEntity.ok(eventoService.getEventosByEmail(email));
    }
    // Verificar disponibilidad de fecha
    @GetMapping("/check-availability")
    public ResponseEntity<Map<String, Object>> checkAvailability(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        boolean available = eventoService.checkAvailability(date);
        Map<String, Object> response = new HashMap<>();
        response.put("available", available);
        response.put("date", date);
        return ResponseEntity.ok(response);
    }


}
microservicio insumos:
package com.microservicio.Insumos.Controller;

import com.microservicio.Insumos.Entities.EstadoInsumo;
import com.microservicio.Insumos.Services.InsumoServiceRead;
import com.microservicio.Insumos.Services.InsumoServiceWrite;
import com.microservicio.Insumos.dto.InsumoDTO;
import com.microservicio.Insumos.dto.InsumoRequestDTO;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/insumos")
public class InsumoController {

    @Autowired
    private InsumoServiceRead insumoRead;
    @Autowired
    private InsumoServiceWrite insumoWrite;


    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(insumoRead.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        var insumo = insumoRead.findById(id);
        if (insumo.isPresent()) {
            return ResponseEntity.ok(insumo.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Insumo no encontrado con id: " + id));
        }
    }

    // NUEVO: Búsqueda por nombre
    @GetMapping("/search")
    public ResponseEntity<?> searchByNombre(@RequestParam String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "El parámetro 'nombre' es requerido"));
        }
        var resultados = insumoRead.findByNombre(nombre);
        if (resultados.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "No se encontraron insumos con: " + nombre));
        }
        return ResponseEntity.ok(resultados);
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<?> getByEstado(@PathVariable EstadoInsumo estado) {
        return ResponseEntity.ok(insumoRead.findByEstado(estado));
    }

    @GetMapping("/low-stock")
    public ResponseEntity<?> getLowStock() {
        return ResponseEntity.ok(insumoRead.findLowStock());
    }

    @GetMapping("/out-of-stock")
    public ResponseEntity<?> getOutOfStock() {
        return ResponseEntity.ok(insumoRead.findOutOfStock());
    }

    @PostMapping("/crear")
    public ResponseEntity<?> create(@Valid @RequestBody InsumoRequestDTO insumoDTO) {
        try {
            InsumoDTO saved = insumoWrite.save(insumoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Error al crear insumo: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,
                                    @Valid @RequestBody InsumoRequestDTO insumoDTO) {
        try {
            InsumoDTO updated = insumoWrite.update(id, insumoDTO);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/stock")
    public ResponseEntity<?> updateStock(@PathVariable Integer id,
                                         @RequestBody Map<String, Integer> request) {
        try {
            Integer nuevoStock = request.get("stock");
            if (nuevoStock == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "El campo 'stock' es requerido"));
            }
            InsumoDTO updated = insumoWrite.updateStock(id, nuevoStock);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        try {
            insumoWrite.delete(id);
            return ResponseEntity.ok(Map.of("message", "Insumo eliminado exitosamente"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
microservicio mermas:
package com.microservicio.Mermas.Controller;

import com.microservicio.Mermas.Entities.TipoMerma;
import com.microservicio.Mermas.Services.MermaServiceRead;
import com.microservicio.Mermas.Services.MermaServiceWrite;
import com.microservicio.Mermas.dto.MermaDTO;
import com.microservicio.Mermas.dto.MermaRequestDTO;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/mermas")
public class MermaController {
    @Autowired
    private  MermaServiceRead mermaRead;
    @Autowired
    private  MermaServiceWrite mermaWrite;

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(mermaRead.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        var merma = mermaRead.findById(id);
        return ResponseEntity.ok(merma);
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<?> getByTipo(@PathVariable TipoMerma tipo) {
        return ResponseEntity.ok(mermaRead.findByTipo(tipo));
    }

    @GetMapping("/productos")
    public ResponseEntity<?> getProductos() {
        return ResponseEntity.ok(mermaRead.getProductos());
    }

    @GetMapping("/insumos")
    public ResponseEntity<?> getInsumos() {
        return ResponseEntity.ok(mermaRead.getInsumos());
    }

    @PostMapping("/crear")
    public ResponseEntity<?> create(@Valid @RequestBody MermaRequestDTO mermaDTO) {
        MermaDTO saved = mermaWrite.save(mermaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @Valid @RequestBody MermaRequestDTO mermaDTO) {
        MermaDTO updated = mermaWrite.update(id, mermaDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        mermaWrite.delete(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Merma eliminada exitosamente");
        return ResponseEntity.ok(response);
    }
}
microservicio mesas: 
package com.microservicio.mesas.controller;
import com.microservicio.mesas.dto.*;
import com.microservicio.mesas.entity.EstadoMesa;
import com.microservicio.mesas.service.MesaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/mesas")
@RequiredArgsConstructor
public class MesaController {
    private final MesaService mesaService;
    @GetMapping("/all")
    public ResponseEntity<List<MesaResponseDTO>> getAllMesas() {
        return ResponseEntity.ok(mesaService.getAllMesas());
    }
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<MesaResponseDTO>> getMesasByEstado(@PathVariable EstadoMesa estado) {
        return ResponseEntity.ok(mesaService.getMesasByEstado(estado));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MesaResponseDTO> getMesaById(@PathVariable Long id) {
        return ResponseEntity.ok(mesaService.getMesaById(id));
    }

    @GetMapping("/numero/{numero}")
    public ResponseEntity<MesaResponseDTO> getMesaByNumero(@PathVariable Integer numero) {
        return ResponseEntity.ok(mesaService.getMesaByNumero(numero));
    }

    @PostMapping("/crear")
    public ResponseEntity<MesaResponseDTO> createMesa(@Valid @RequestBody CrearMesaRequestDTO request) {
        MesaResponseDTO newMesa = mesaService.createMesa(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(newMesa);
    }
    @PutMapping("/{id}/estado")
    public ResponseEntity<MesaResponseDTO> updateEstado(
            @PathVariable Long id,
            @Valid @RequestBody ActualizarEstadoMesaRequestDTO request) {
        return ResponseEntity.ok(mesaService.updateEstado(id, request));
    }
    @PutMapping("/{id}/total")
    public ResponseEntity<MesaResponseDTO> updateTotal(
            @PathVariable Long id,
            @Valid @RequestBody ActualizarTotalMesaRequestDTO request) {
        return ResponseEntity.ok(mesaService.updateTotal(id, request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMesa(@PathVariable Long id) {
        mesaService.deleteMesa(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<MesaResponseDTO> updateMesa(
            @PathVariable Long id,
            @Valid @RequestBody CrearMesaRequestDTO request) {
        return ResponseEntity.ok(mesaService.updateMesa(id, request));
    }

    @PutMapping("/numero/{numero}/estado")
    public ResponseEntity<MesaResponseDTO> updateEstadoByNumero(
            @PathVariable Integer numero,
            @Valid @RequestBody ActualizarEstadoMesaRequestDTO request) {
        return ResponseEntity.ok(mesaService.updateEstadoByNumero(numero, request));
    }

    @PutMapping("/numero/{numero}/total")
    public ResponseEntity<MesaResponseDTO> updateTotalByNumero(
            @PathVariable Integer numero,
            @Valid @RequestBody ActualizarTotalMesaRequestDTO request) {
        return ResponseEntity.ok(mesaService.updateTotalByNumero(numero, request));
    }
}
microservicio pagos:
package com.microservicio.pagos.controller;
import com.microservicio.pagos.dto.MetricasPagosResponseDTO;
import com.microservicio.pagos.dto.ProcesarPagoRequestDTO;
import com.microservicio.pagos.dto.ProcesarPagoResponseDTO;
import com.microservicio.pagos.entity.Comprobante;
import com.microservicio.pagos.repository.ComprobanteRepository;
import com.microservicio.pagos.service.PagoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
@RestController
@RequestMapping("/pagos")
public class PagoController {
    @Autowired
    private  PagoService pagoService;
    @Autowired
    private  ComprobanteRepository comprobanteRepository;
    @PostMapping("/procesar")
    public ResponseEntity<ProcesarPagoResponseDTO> procesarPago(
            @Valid @RequestBody ProcesarPagoRequestDTO request) {
        ProcesarPagoResponseDTO response = pagoService.procesarPago(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    // Listar comprobantes
    @GetMapping("/comprobantes")
    public ResponseEntity<List<Comprobante>> listarComprobantes() {
        List<Comprobante> comprobantes = comprobanteRepository.findAllByOrderByIdDesc();
        return ResponseEntity.ok(comprobantes);
    }
    //  Descargar PDF de un comprobante
    @GetMapping("/comprobantes/{id}/pdf")
    public ResponseEntity<byte[]> descargarPdf(@PathVariable Long id) {
        try {
            Comprobante comprobante = comprobanteRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Comprobante no encontrado"));

            Path pdfPath = Paths.get(comprobante.getPdfUrl());

            if (!Files.exists(pdfPath)) {
                return ResponseEntity.notFound().build();
            }

            byte[] pdfBytes = Files.readAllBytes(pdfPath);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment",
                    comprobante.getNumeroCompleto() + ".pdf");

            return ResponseEntity.ok().headers(headers).body(pdfBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    @GetMapping("/metricas")
    public ResponseEntity<MetricasPagosResponseDTO> getMetricas() {
        return ResponseEntity.ok(pagoService.getMetricas());
    }

}
microservicio pedidos: 
package com.microservicio.pedidos.controller;
import com.microservicio.pedidos.dto.*;
import com.microservicio.pedidos.entity.EstadoPedido;
import com.microservicio.pedidos.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/pedidos")
public class PedidoController {
    private final PedidoService pedidoService;
    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<PedidoResponseDTO>> getAllPedidos() {
        return ResponseEntity.ok(pedidoService.getAllPedidos());
    }
    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponseDTO> getPedidoById(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.getPedidoById(id));
    }
    @GetMapping("/orden/{ordenId}")
    public ResponseEntity<PedidoResponseDTO> getPedidoByOrdenId(@PathVariable String ordenId) {
        return ResponseEntity.ok(pedidoService.getPedidoByOrdenId(ordenId));
    }
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<PedidoResponseDTO>> getPedidosByEstado(@PathVariable EstadoPedido estado) {
        return ResponseEntity.ok(pedidoService.getPedidosByEstado(estado));
    }
    @PostMapping("/crear")
    public ResponseEntity<PedidoResponseDTO> crearPedido(@Valid @RequestBody CrearPedidoRequestDTO request) {
        PedidoResponseDTO newPedido = pedidoService.crearPedido(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(newPedido);
    }
    @PatchMapping("/{id}/estado")
    public ResponseEntity<PedidoResponseDTO> actualizarEstado(
            @PathVariable Long id,
            @Valid @RequestBody ActualizarEstadoRequestDTO request) {
        return ResponseEntity.ok(pedidoService.actualizarEstado(id, request));
    }
    @PatchMapping("/items/{itemId}/completado")
    public ResponseEntity<PedidoItemResponseDTO> actualizarItemCompletado(
            @PathVariable Long itemId,
            @Valid @RequestBody ActualizarItemCompletadoRequestDTO request) {
        return ResponseEntity.ok(pedidoService.actualizarItemCompletado(itemId, request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPedido(@PathVariable Long id) {
        pedidoService.eliminarPedido(id);
        return ResponseEntity.noContent().build();
    }
    //metrica
    @GetMapping("/metricas")
    public ResponseEntity<MetricasPedidosResponseDTO> getMetricas() {
        return ResponseEntity.ok(pedidoService.getMetricas());
    }

    @PostMapping("/orden/{ordenId}/estado")
    public ResponseEntity<PedidoResponseDTO> actualizarEstadoPorOrdenId(
            @PathVariable String ordenId,
            @Valid @RequestBody ActualizarEstadoRequestDTO request) {
        System.out.println("recibido para orden: " + ordenId + " -> " + request.getEstado());
        return ResponseEntity.ok(pedidoService.actualizarEstadoPorOrdenId(ordenId, request));
    }
}
microservicio productos:
package com.microservicio.Producto.Controller;
import com.microservicio.Producto.Entities.Categoria;
import com.microservicio.Producto.Services.ProductoServiceRead;
import com.microservicio.Producto.Services.ProductoServiceWrite;
import com.microservicio.Producto.dto.ProductoDTO;
import com.microservicio.Producto.exception.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/productos")
public class ProductoController {
    @Autowired
    private ProductoServiceWrite productoWrite;
    @Autowired
    private ProductoServiceRead productoRead;

    // GET: Listar todos los productos
    @GetMapping("/all")
    public ResponseEntity<List<ProductoDTO>> getAllProductos() {
        return ResponseEntity.ok(productoRead.findAll());
    }
    // GET: Obtener producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductoById(@PathVariable Integer id) {
        return ResponseEntity.ok(productoRead.findById(id));
    }
    // GET: Obtener imagen del producto
    @GetMapping(value = "/{id}/imagen", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public ResponseEntity<byte[]> getImagen(@PathVariable Integer id) {
        byte[] imagen = productoRead.getImagen(id);
        return ResponseEntity.ok().body(imagen);
    }
    // GET: Filtrar por categoría
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProductoDTO>> getByCategoria(@PathVariable Categoria categoria) {
        return ResponseEntity.ok(productoRead.findByCategoria(categoria));
    }
    // GET: Filtrar por rango de precio
    @GetMapping("/precio")
    public ResponseEntity<List<ProductoDTO>> getByPrecioRange(
            @RequestParam Double min,
            @RequestParam Double max) {
        return ResponseEntity.ok(productoRead.findByPrecioRange(min, max));
    }
    // Crear producto con imagen
    @PostMapping(value = "/crear",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createProducto(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") Double precio,
            @RequestParam("categoria") Categoria categoria,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen) {
        ProductoDTO productoDTO = new ProductoDTO();
        productoDTO.setNombre(nombre);
        productoDTO.setDescripcion(descripcion);
        productoDTO.setPrecio(java.math.BigDecimal.valueOf(precio));
        productoDTO.setCategoria(categoria);
        ProductoDTO saved = productoWrite.save(productoDTO, imagen);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    // Actualizar producto completo
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProducto(
            @PathVariable Integer id,
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") Double precio,
            @RequestParam("categoria") Categoria categoria,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen) {
        ProductoDTO productoDTO = new ProductoDTO();
        productoDTO.setNombre(nombre);
        productoDTO.setDescripcion(descripcion);
        productoDTO.setPrecio(java.math.BigDecimal.valueOf(precio));
        productoDTO.setCategoria(categoria);
        ProductoDTO updated = productoWrite.update(id, productoDTO, imagen);
        return ResponseEntity.ok(updated);
    }
    // Actualizar solo la imagen
    @PutMapping(value = "/{id}/imagen", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateImagen( @PathVariable Integer id, @RequestParam("imagen") MultipartFile imagen) {
        productoWrite.updateImagen(id, imagen);
        return ResponseEntity.ok(Map.of("message", "Imagen actualizada exitosamente"));
    }
    // Eliminar producto (incluye su imagen)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProducto(@PathVariable Integer id) {
        productoWrite.delete(id);
        return ResponseEntity.ok(Map.of("message", "Producto eliminado exitosamente"));
    }
    // Eliminar solo la imagen del producto
    @DeleteMapping("/{id}/imagen")
    public ResponseEntity<?> deleteImagen(@PathVariable Integer id) {
        productoWrite.deleteImagen(id);
        return ResponseEntity.ok(Map.of("message", "Imagen eliminada exitosamente"));
    }
    // MODIFICACION STOCK :V
    @PutMapping("/{id}/stock")
    public ResponseEntity<?> updateStock( @PathVariable Integer id, @RequestBody Map<String, Integer> request) {
        Integer nuevoStock = request.get("stock");
        ProductoDTO updated = productoWrite.updateStock(id, nuevoStock);
        return ResponseEntity.ok(updated);
    }
    // Obtener stock de un producto
    @GetMapping("/{id}/stock")
    public ResponseEntity<?> getStock(@PathVariable Integer id) {
        Integer stock = productoRead.getStock(id);
        return ResponseEntity.ok(Map.of("stock", stock));
    }
}
microservico proveedor:
package com.microservicio.Proveedor.Controller;
import com.microservicio.Proveedor.dto.OrdenCompraRequestDTO;
import com.microservicio.Proveedor.Services.orden_compra.OrdenCompraReadService;
import com.microservicio.Proveedor.Services.orden_compra.OrdenCompraWriteService;
import com.microservicio.Proveedor.Services.proveedor.ProveedorServiceRead;
import com.microservicio.Proveedor.Services.proveedor.ProveedorServiceWrite;
import com.microservicio.Proveedor.dto.ProveedorDTO;
import com.microservicio.Proveedor.dto.ProveedorRequestDTO;
import com.microservicio.Proveedor.Entities.EstadoOrden;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/proveedores")
public class ProveedorController {

    @Autowired
    private  OrdenCompraReadService ordenCompraRead;
    @Autowired
    private  OrdenCompraWriteService ordenCompraWrite;
    @Autowired
    private  ProveedorServiceRead proveedorRead;
    @Autowired
    private  ProveedorServiceWrite proveedorWrite;
    // ============ PROVEEDORES CRUD ============

    @GetMapping("/all")
    public ResponseEntity<?> getAllProveedores() {
        return ResponseEntity.ok(proveedorRead.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProveedorById(@PathVariable Integer id) {
        var proveedor = proveedorRead.findById(id);
        return ResponseEntity.ok(proveedor);
    }

    @PostMapping("/crear")
    public ResponseEntity<?> createProveedor(@Valid @RequestBody ProveedorRequestDTO proveedorDTO) {
        ProveedorDTO saved = proveedorWrite.save(proveedorDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProveedor(@PathVariable Integer id,
                                             @Valid @RequestBody ProveedorRequestDTO proveedorDTO) {
        ProveedorDTO updated = proveedorWrite.update(id, proveedorDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProveedor(@PathVariable Integer id) {
        proveedorWrite.delete(id);
        return ResponseEntity.ok(Map.of("message", "Proveedor eliminado exitosamente"));
    }

    // ============ ÓRDENES DE COMPRA ============

    @GetMapping("/{id}/ordenes")
    public ResponseEntity<?> getOrdenesByProveedor(@PathVariable Integer id) {
        return ResponseEntity.ok(ordenCompraRead.findByProveedor(id));
    }

    @GetMapping("/ordenes")
    public ResponseEntity<?> getAllOrdenes() {
        return ResponseEntity.ok(ordenCompraRead.findAll());
    }

    @GetMapping("/ordenes/{ordenId}")
    public ResponseEntity<?> getOrdenById(@PathVariable Integer ordenId) {
        var orden = ordenCompraRead.findById(ordenId);
        return ResponseEntity.ok(orden);
    }

    @PostMapping("/ordenes")
    public ResponseEntity<?> createOrden(@RequestBody Map<String, Integer> request) {
        Integer proveedorId = request.get("proveedorId");

        if (proveedorId == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "El campo 'proveedorId' es requerido"));
        }

        OrdenCompraRequestDTO requestDTO = new OrdenCompraRequestDTO();
        requestDTO.setProveedorId(proveedorId);
        var created = ordenCompraWrite.create(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping("/ordenes/{ordenId}/estado")
    public ResponseEntity<?> updateEstado(@PathVariable Integer ordenId,
                                          @RequestBody Map<String, String> request) {
        EstadoOrden estado = EstadoOrden.valueOf(request.get("estado"));
        var updated = ordenCompraWrite.updateEstado(ordenId, estado);
        return ResponseEntity.ok(updated);
    }

    @PostMapping(value = "/ordenes/{ordenId}/factura", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> subirFactura(@PathVariable Integer ordenId,
                                          @RequestParam("factura") MultipartFile factura) {
        var updated = ordenCompraWrite.subirFactura(ordenId, factura);
        return ResponseEntity.ok(updated);

    }

    @GetMapping(value = "/ordenes/{ordenId}/factura")
    public ResponseEntity<byte[]> descargarFactura(@PathVariable Integer ordenId) {
        byte[] factura = ordenCompraRead.descargarFactura(ordenId);
        var orden = ordenCompraRead.findById(ordenId);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(orden.getFacturaTipo()))
                .header("Content-Disposition", "attachment; filename=\"" + orden.getFacturaNombre() + "\"")
                .body(factura);
    }

    @DeleteMapping("/ordenes/{ordenId}/factura")
    public ResponseEntity<?> eliminarFactura(@PathVariable Integer ordenId) {
        ordenCompraWrite.eliminarFactura(ordenId);
        return ResponseEntity.ok(Map.of("message", "Factura eliminada exitosamente"));
    }

    @DeleteMapping("/ordenes/{ordenId}")
    public ResponseEntity<?> deleteOrden(@PathVariable Integer ordenId) {
        ordenCompraWrite.delete(ordenId);
        return ResponseEntity.ok(Map.of("message", "Orden eliminada exitosamente"));
    }
}
microservicio reservas:
package com.microservicio.reservas.controller;

import com.microservicio.reservas.dto.CrearReservaRequestDTO;
import com.microservicio.reservas.dto.ReservaResponseDTO;
import com.microservicio.reservas.entity.EstadoReserva;
import com.microservicio.reservas.service.ReservaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping("/crear")
    public ResponseEntity<ReservaResponseDTO> crearReserva(@Valid @RequestBody CrearReservaRequestDTO request) {
        ReservaResponseDTO reserva = reservaService.crearReserva(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(reserva);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ReservaResponseDTO>> listarTodas() {
        return ResponseEntity.ok(reservaService.listarTodas());
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<ReservaResponseDTO>> listarPorEstado(@PathVariable EstadoReserva estado) {
        return ResponseEntity.ok(reservaService.listarPorEstado(estado));
    }

    @GetMapping("/fecha/{fecha}")
    public ResponseEntity<List<ReservaResponseDTO>> listarPorFecha(@PathVariable LocalDate fecha) {
        return ResponseEntity.ok(reservaService.listarPorFecha(fecha));
    }

    @GetMapping("/dia")
    public ResponseEntity<List<ReservaResponseDTO>> listarReservasDelDia() {
        return ResponseEntity.ok(reservaService.listarReservasDelDia());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(reservaService.obtenerPorId(id));
    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<ReservaResponseDTO> obtenerPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(reservaService.obtenerPorCodigo(codigo));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<ReservaResponseDTO> actualizarEstado(
            @PathVariable Long id,
            @RequestParam EstadoReserva estado) {
        return ResponseEntity.ok(reservaService.actualizarEstado(id, estado));
    }
}
microservicio usuarios:
package service.user.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import service.user.dto.UserLoginRequestDTO;
import service.user.dto.UserRegistroDTO;
import service.user.dto.UserResponseDTO;
import service.user.model.TipoUser;
import service.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UserController {

    @Autowired
    private UserService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@Valid @RequestBody UserLoginRequestDTO request){
        return ResponseEntity.ok(usuarioService.login(request));
    }
    // POST - Registro público (cualquier persona se registra como cliente)
    @PostMapping("/registro")
    public ResponseEntity<UserResponseDTO> registrar(@Valid @RequestBody UserRegistroDTO dto) {
        UserResponseDTO respuesta = usuarioService.registrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
    }

    // PUT - Actualizar datos + rol (solo admins o endpoint protegido)
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> actualizar(
            @PathVariable Integer id,
            @RequestBody UserRegistroDTO dto,
            @RequestParam(required = false) TipoUser tipo) { // opcional el tipo

        UserResponseDTO actualizado = usuarioService.actualizar(id, dto, tipo);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE - Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        usuarioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // GET - Listar todos (solo admins en producción)
    @GetMapping("/all")
    public ResponseEntity<List<UserResponseDTO>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    // GET - Buscar por ID
    @GetMapping("/{id}")
    //Este GET SOLO requiere de un administrador porque ESTAMOS HACIENDO PRUEBAS
    public ResponseEntity<UserResponseDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(usuarioService.buscarPorId(id));
    }
    @PostMapping("/admin/create")
    @PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public ResponseEntity<UserResponseDTO> createUserByAdmin(@Valid @RequestBody UserRegistroDTO dto,
                                                             @RequestParam TipoUser tipo) {
        UserResponseDTO respuesta = usuarioService.createUserByAdmin(dto, tipo);
        return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
    }
}

feign usados:
cocina:
package com.microservicio.cocina.service.feign;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;
@FeignClient(name = "microservicio-pedidos", url = "http://localhost:8217")
public interface PedidoFeignClient {
    @PostMapping("/pedidos/orden/{ordenId}/estado")
    void actualizarEstadoPedido(@PathVariable("ordenId") String ordenId,
                                @RequestBody Map<String, String> request);
}
mermas:
package com.microservicio.Mermas.Services.feign;

import com.microservicio.Mermas.dto.InsumoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

@FeignClient(name = "microservicio-insumos")
public interface InsumoFeignClient {

    @GetMapping("/insumos")
    List<InsumoDTO> getAllInsumos();

    @GetMapping("/insumos/{id}")
    InsumoDTO getInsumoById(@PathVariable("id") Integer id);
}
package com.microservicio.Mermas.Services.feign;

import com.microservicio.Mermas.dto.ProductoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

@FeignClient(name = "microservicio-producto")
public interface ProductoFeignClient {

    @GetMapping("/productos")
    List<ProductoDTO> getAllProductos();

    @GetMapping("/productos/{id}")
    ProductoDTO getProductoById(@PathVariable("id") Integer id);
}
pagos:
package com.microservicio.pagos.service.feign;

import com.microservicio.pagos.dto.MesaResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@FeignClient(name = "microservicio-mesas", url = "http://localhost:8216")
public interface MesaFeignClient {

    @PutMapping("/mesas/numero/{numero}/estado")
    void liberarMesa(@PathVariable("numero") Integer numero,
                     @RequestBody Map<String, Object> request);

    @PutMapping("/mesas/numero/{numero}/total")
    void resetearTotal(@PathVariable("numero") Integer numero,
                       @RequestBody Map<String, Double> request);
    @GetMapping("/mesas")
    List<MesaResponseDTO> getAllMesas();
}
package com.microservicio.pagos.service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;

@FeignClient(name = "microservicio-pedidos", url = "http://localhost:8217")
public interface PedidoFeignClient {

    @PatchMapping("/pedidos/orden/{ordenId}/estado")
    void actualizarEstadoPedido(@PathVariable("ordenId") String ordenId,
                                @RequestBody Map<String, String> request);
}
pedidos:
package com.microservicio.pedidos.service.feign;

import com.microservicio.pedidos.dto.CrearPedidoCocinaRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "microservicio-cocina", url = "http://localhost:8218")
public interface CocinaFeignClient {

    @PostMapping("/cocina/pedidos")
    void enviarPedidoACocina(@RequestBody CrearPedidoCocinaRequestDTO request);
}
package com.microservicio.pedidos.service.feign;

import com.microservicio.pedidos.dto.ActualizarEstadoMesaRequestDTO;
import com.microservicio.pedidos.dto.ActualizarTotalMesaRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "microservicio-mesas", url = "http://localhost:8216")
public interface MesaFeignClient {

    @PutMapping("/mesas/numero/{numero}/estado")
    void actualizarEstadoMesa(@PathVariable("numero") Integer numero,
                              @RequestBody ActualizarEstadoMesaRequestDTO request);

    @PutMapping("/mesas/numero/{numero}/total")
    void actualizarTotalMesa(@PathVariable("numero") Integer numero,
                             @RequestBody ActualizarTotalMesaRequestDTO request);
}
package com.microservicio.pedidos.service.feign;

import com.microservicio.pedidos.dto.ProductoResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@FeignClient(name = "microservicio-producto", url = "http://localhost:8080")
public interface ProductoFeignClient {

    @GetMapping("/productos/{id}")
    ProductoResponseDTO obtenerProductoPorId(@PathVariable("id") Integer id);

    @GetMapping("/productos/{id}/stock")
    StockResponse obtenerStockProducto(@PathVariable("id") Integer id);

    @PutMapping("/productos/{id}/stock")  // ← Cambiar a PUT
    void actualizarStock(@PathVariable("id") Integer id,
                         @RequestBody Map<String, Integer> request);

    class StockResponse {
        private Integer stock;

        public StockResponse() {}

        public Integer getStock() { return stock; }
        public void setStock(Integer stock) { this.stock = stock; }
    }
}