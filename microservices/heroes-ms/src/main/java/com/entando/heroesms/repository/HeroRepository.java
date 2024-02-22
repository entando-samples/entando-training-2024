package com.entando.heroesms.repository;

import com.entando.heroesms.model.HeroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeroRepository extends JpaRepository<HeroEntity, Long> {

}
