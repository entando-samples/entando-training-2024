package com.entando.heroms.service;

import com.entando.heroms.model.HeroDto;
import com.entando.heroms.model.HeroEntity;
import com.entando.heroms.repository.HeroRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HeroServiceImpl implements HeroService {

    private final HeroRepository heroRepository;

    @Override
    public List<HeroDto> getHeroes() {
        return this.heroRepository.findAll().stream()
                .map(this::toHeroDto)
                .collect(Collectors.toList());
    }

    @Override
    public HeroDto createHero(HeroDto hero) {

        final HeroEntity heroEntity = new HeroEntity().setName(hero.name()).setCity(hero.city())
                .setSuperPower(hero.superPower());

        final HeroEntity savedHero = this.heroRepository.save(heroEntity);

        return this.toHeroDto(savedHero);
    }

    private HeroDto toHeroDto(HeroEntity h) {
        return new HeroDto(h.getId(), h.getName(), h.getName(), h.getSuperPower());
    }
}
