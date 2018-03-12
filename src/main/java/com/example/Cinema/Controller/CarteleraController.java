package com.example.Cinema.Controller;


import com.example.Cinema.Entities.Cartelera;
import com.example.Cinema.Entities.Cine;
import com.example.Cinema.Entities.DetalleCartelera;
import com.example.Cinema.Repository.*;
import com.example.Cinema.Services.CarteleraServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * Created by anyderre on 07/03/18.
 */
@RestController
@RequestMapping(value = "/api")
public class CarteleraController {
    @Autowired
    private CarteleraRepository carteleraRepository;
    @Autowired
    private CarteleraServices carteleraServices;
    @Autowired
    private CarteleraDetalleRepository carteleraDetalleRepository;

    @PostMapping(value = "/cartelera/")
    public ResponseEntity<List<DetalleCartelera>> saveCartelera(@Valid @RequestBody List<DetalleCartelera> detalleCarteleras, UriComponentsBuilder componentsBuilder){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        List<Cartelera> carteleras = carteleraRepository.findAll();
        Cartelera car= new Cartelera();
        boolean existed = true;
        if(!carteleras.isEmpty()){
            for(Cartelera cartelera: carteleras){
                if(
                        detalleCarteleras.get(0).getCartelera().getCine().getNombre().equals(cartelera.getCine().getNombre()) &&
                                detalleCarteleras.get(0).getCartelera().getSurcusal().getNombre().equals(cartelera.getSurcusal().getNombre())&&
                                simpleDateFormat.format( detalleCarteleras.get(0).getCartelera().getFechaInicio()).equals(simpleDateFormat.format(cartelera.getFechaInicio()))&&
                                simpleDateFormat.format( detalleCarteleras.get(0).getCartelera().getFechaFin()).equals(simpleDateFormat.format(cartelera.getFechaFin()))
                        ){
                    existed= true;
                    for(DetalleCartelera detalleCartelera: detalleCarteleras){
                        detalleCartelera.setCartelera(cartelera);
                        carteleraDetalleRepository.save(detalleCartelera);
                    }
                    car=cartelera;
                    break;

                }
                existed = false;
            }

            if(!existed){
                Cartelera currentCartelera = carteleraRepository.save(detalleCarteleras.get(0).getCartelera());
                car=currentCartelera;
                for(DetalleCartelera detalleCartelera: detalleCarteleras){
                    detalleCartelera.setCartelera(currentCartelera);
                    carteleraDetalleRepository.save(detalleCartelera);
                }
            }
        }else{
            Cartelera currentCartelera = carteleraRepository.save(detalleCarteleras.get(0).getCartelera());
            for(DetalleCartelera detalleCartelera: detalleCarteleras){
                detalleCartelera.setCartelera(currentCartelera);
                carteleraDetalleRepository.save(detalleCartelera);
            }
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(componentsBuilder.path("/person/{id}").buildAndExpand(car.getId()).toUri());

        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/cartelera/{id}")
    public ResponseEntity<Cartelera> deleteCartelera(@PathVariable(value="id")long id){
        Cartelera cartelera= carteleraRepository.findById(id);

        if (cartelera==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        carteleraServices.deleteDetalleCarteleraByCartelera(cartelera);
        carteleraRepository.delete(cartelera);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/cartelera/")
    public ResponseEntity <List<Cartelera>> getList(){
        List<Cartelera> carteleras = carteleraRepository.findAll();
        if (carteleras.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(carteleras, HttpStatus.OK);
    }
    @GetMapping(value = "/cartelera/detalleCartelera/{id}")
    public ResponseEntity <List<DetalleCartelera>> getListByCartelera(@PathVariable(value = "id")long id){
        Cartelera cartelera = carteleraRepository.findById(id);

        if (cartelera==null)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(carteleraDetalleRepository.findAllByCarteleraId(cartelera.getId()), HttpStatus.OK);
    }

    @PutMapping("/cartelera/{id}")
    public ResponseEntity<List<DetalleCartelera>> updateCartelera(@Valid @RequestBody List<DetalleCartelera> detalleCarteleras, @PathVariable(value = "id")long id){
        if(detalleCarteleras.isEmpty()) {
            for(DetalleCartelera det : carteleraDetalleRepository.findAllByCarteleraId(id)){
                carteleraDetalleRepository.delete(det);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        Cartelera c = carteleraRepository.findById(id);
        c.setFechaFin(detalleCarteleras.get(0).getCartelera().getFechaFin());
        c.setFechaInicio(detalleCarteleras.get(0).getCartelera().getFechaInicio());
        c.setSurcusal(detalleCarteleras.get(0).getCartelera().getSurcusal());
        c.setCine(detalleCarteleras.get(0).getCartelera().getCine());
        carteleraRepository.save(c);

        boolean found = true;
        List<DetalleCartelera> savedDetalleCarteleraList = carteleraDetalleRepository.findAllByCarteleraId(id);
        for(DetalleCartelera saveDC: savedDetalleCarteleraList) {
            for (DetalleCartelera currentDC : detalleCarteleras) {
                if (currentDC.getId() == saveDC.getId()) {
                    saveDC.setCartelera(currentDC.getCartelera());
                    saveDC.setDia(currentDC.getDia());
                    saveDC.setHoraFin(currentDC.getHoraFin());
                    saveDC.setHoraInicio(currentDC.getHoraInicio());
                    saveDC.setPelicula(currentDC.getPelicula());
                    saveDC.setSala(currentDC.getSala());
                    carteleraDetalleRepository.save(saveDC);
                    found = true;
                    break;
                }
                found = false;
            }
            if(!found){
                carteleraDetalleRepository.delete(saveDC);
            }
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
