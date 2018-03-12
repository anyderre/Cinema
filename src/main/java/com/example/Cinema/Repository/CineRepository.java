package com.example.Cinema.Repository;

import com.example.Cinema.Entities.Cine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by anyderre on 07/03/18.
 */
@Repository
public interface CineRepository extends JpaRepository<Cine, Long> {
    Cine save (Cine cine);
    Cine findById(long id);
    List<Cine> findAll();
    void deleteById(long id);
}
