package com.example.Cinema.Entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by anyderre on 08/03/18.
 */
@Entity
@Data
@Table(name = "detalle_cartelera")
public class DetalleCartelera implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String dia;
    private String horaInicio;
    private String horaFin;
    @ManyToOne(optional = false)
    @JoinColumn(name = "pelicula_id")
    private Pelicula pelicula;
    @ManyToOne(optional = false)
    @JoinColumn(name = "sala_id")
    private Sala sala;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cartelera_id")
    private Cartelera cartelera;
    private boolean enabled =true;

}
