package com.example.Cinema.Entities;


import lombok.Data;
import org.hibernate.engine.internal.Cascade;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by anyderre on 07/03/18.
 */

@Table(name = "sala")
@Entity
@Data
public class Sala implements Serializable {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "surcusal_id")
    private Surcusal surcusal;

   @NotNull
   @Size(max = 20, min =1)
   private String nombre;
   private boolean enabled=true;
}
