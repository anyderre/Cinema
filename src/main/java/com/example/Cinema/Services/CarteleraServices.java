package com.example.Cinema.Services;

import com.example.Cinema.Entities.Cartelera;
import com.example.Cinema.Entities.Cine;
import com.example.Cinema.Entities.DetalleCartelera;
import com.example.Cinema.Entities.Surcusal;
import com.example.Cinema.Repository.CarteleraDetalleRepository;
import com.example.Cinema.Repository.CarteleraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by anyderre on 09/03/18.
 */
@Service
public class CarteleraServices {
    @Autowired
    private CarteleraRepository carteleraRepository;

    @Autowired
    private CarteleraDetalleRepository detalleRepository;

    public void deleteCarteleraByCine(Cine cine){
        for(Cartelera cartelera: carteleraRepository.findAllByCineId(cine.getId())){
            carteleraRepository.delete(cartelera);
        }
    }
    public void deleteCarteleraBySurcusal(Surcusal surcusal){
        for (Cartelera cartelera : carteleraRepository.findAllBySurcusalId(surcusal.getId())){
            carteleraRepository.delete(cartelera);
        }
    }
    public void deleteDetalleCarteleraByCartelera(Cartelera cartelera){
        for(DetalleCartelera detalleCartelera : detalleRepository.findAllByCarteleraId(cartelera.getId())){
            detalleRepository.delete(detalleCartelera);
        }
    }
}
