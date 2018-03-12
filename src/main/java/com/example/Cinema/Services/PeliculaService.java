package com.example.Cinema.Services;

import com.example.Cinema.Entities.DetalleCartelera;
import com.example.Cinema.Entities.Pelicula;
import com.example.Cinema.Repository.CarteleraDetalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by anyderre on 09/03/18.
 */
@Service
public class PeliculaService{
    @Autowired
    private CarteleraDetalleRepository carteleraDetalleRepository;

    public void deleteCartelleraDetalle(long id){
       List<DetalleCartelera> carteleras = carteleraDetalleRepository.findAllByPeliculaId(id);
        for (DetalleCartelera det: carteleras){
            System.out.println("Deleting");
            carteleraDetalleRepository.delete(det);
        }

    }
}
