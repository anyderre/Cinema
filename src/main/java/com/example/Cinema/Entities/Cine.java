package com.example.Cinema.Entities;


import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by anyderre on 07/03/18.
 */
@Data
@Entity
@Table(name = "cine")
public class Cine implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotNull
    @Size(max = 100, min = 2)
    private String nombre;


    private boolean enabled = true;

}
