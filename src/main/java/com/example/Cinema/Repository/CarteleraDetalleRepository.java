package com.example.Cinema.Repository;

import com.example.Cinema.Entities.DetalleCartelera;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by anyderre on 08/03/18.
 */
public interface CarteleraDetalleRepository extends JpaRepository<DetalleCartelera, Long> {
    DetalleCartelera save(DetalleCartelera detalleCartelera);
    DetalleCartelera findById(long id);
    List<DetalleCartelera> findAllBySalaId(long id  );
    List<DetalleCartelera> findAllByPeliculaId(long id);
    List<DetalleCartelera> findAllByCarteleraId(long id);
}
