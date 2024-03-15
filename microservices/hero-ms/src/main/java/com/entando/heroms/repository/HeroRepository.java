package com.entando.heroms.repository;

import com.entando.heroms.model.HeroDto;
import com.entando.heroms.model.HeroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeroRepository extends JpaRepository<HeroEntity, Long> {

}
