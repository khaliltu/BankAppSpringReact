package tn.iit.bank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.iit.bank.entities.MoneyTransferHistory;

@Repository
public interface MoneyTransferHistoryRepository extends JpaRepository<MoneyTransferHistory, Long> {
	
}
