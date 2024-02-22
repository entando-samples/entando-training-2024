package com.entando.heroesms.controller;

import com.entando.heroesms.dto.Hero;
import com.entando.heroesms.service.HeroServiceImpl;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hero")
@RequiredArgsConstructor
public class HeroController {

    private final HeroServiceImpl heroService;

    @GetMapping
    public ResponseEntity<List<Hero>> getHeroes() {
        return ResponseEntity.ok(heroService.getHeroes());
    }

    @PostMapping
    public ResponseEntity<Hero> getHero(@RequestBody Hero hero) {
        return ResponseEntity.ok(heroService.createHero(hero));
    }
}
