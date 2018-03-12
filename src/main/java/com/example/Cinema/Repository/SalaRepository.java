package com.example.Cinema.Repository;

import com.example.Cinema.Entities.Sala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by anyderre on 07/03/18.
 */
@Repository
public interface SalaRepository extends JpaRepository<Sala, Long> {
    Sala save(Sala sala);
    Sala findById(long id);
    List<Sala> findAll();
    List<Sala> findAllBySurcusalId(long id);
}
